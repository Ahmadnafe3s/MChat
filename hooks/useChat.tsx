import ChatApi from "@/services/chat";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { useToastStore } from "@/store/toast";
import debounce from "@/utils/debounce";
import generateOptMessage from "@/utils/generateOptMessage";
import { useFocusEffect } from "@react-navigation/native";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

const useChat = (screen?: "chats" | "conversation" | "template") => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  const { selectedChat, setStarred, setStatus } = useChatStore();

  const queryClient = useQueryClient();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, refetch, error, isError, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["chats", user?.id, search, filter],
      queryFn: ({ pageParam }) =>
        ChatApi.getChats({
          value: user?.id!,
          status: filter,
          page: pageParam,
          attribute: user?.attribute!,
          search: search,
          per_page: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: PaginatedChats) => {
        const { current_page, last_page } = lastPage;
        return current_page < last_page ? current_page + 1 : undefined;
      },
      enabled: screen === "chats",
    });


  const {
    data: conversations,
    isLoading: isLoadingConversations,
    error: errorConversations,
    isError: isErrorConversations,
  } = useQuery({
    queryKey: ["conversations", selectedChat?.id],
    queryFn: () => ChatApi.getConversations(selectedChat?.id!),
    refetchOnWindowFocus: true,
    enabled: !!selectedChat?.id && screen === "conversation",
    placeholderData: keepPreviousData
  });


  const {
    mutate: sendMessage,
    isError: isErrorSendChat,
    isPending,
  } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: ({ receiverId, data }: { receiverId: number; data: any }) =>
      ChatApi.sendMessage({ receiverId, data }),
    onMutate: async ({
      receiverId,
      data,
    }: {
      receiverId: number;
      data: any;
    }) => {
      const message = generateOptMessage(data);
      await queryClient.cancelQueries({
        queryKey: ["conversations", selectedChat?.id!],
      });

      const previousData = queryClient.getQueryData([
        "conversations",
        selectedChat?.id!,
      ]);

      // updating the cache with the optimistic update
      queryClient.setQueryData(
        ["conversations", selectedChat?.id!],
        (oldData: Conversations[]) => {
          return [message, ...oldData];
        }
      );

      return previousData;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const Err = error.response?.data.message || error.message;
      showToast(Err, "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", selectedChat?.id!],
      });
    },
  });

  // Sending Post Request
  const starredChat = useMutation({
    mutationFn: () => ChatApi.setStarred(selectedChat?.id!),
    onSuccess: (data: { status: string }) => {
      setStarred(data.status);
    },
    onError: () => {
      showToast("Failed to star the chat", "error");
    },
  });

  const blockChat = useMutation({
    mutationFn: () => ChatApi.blockChat(selectedChat?.id!),
    onSuccess: (data: { status: string }) => {
      setStatus(data.status)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const Err = error.response?.data.message || error.message;
      showToast(Err, "error");
    },
  })


  const getChatMedia = useQuery({
    queryKey: ["media", selectedChat?.id],
    queryFn: () => ChatApi.getMedia(selectedChat?.id!),
    enabled: !!selectedChat?.id,
  });

  const onSearch = debounce((value: string) => {
    setSearch(value);
  }, 400);

  // refetch on focus root
  useFocusEffect(
    useCallback(() => {
      if (screen === "chats") {
        refetch();
      }
    }, [refetch, screen])
  )

  const chats = data?.pages.flatMap((page) => page?.data ?? []) ?? [];


  return {
    chats,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    totalChats: data?.pages.flat()[0].total ?? 0,
    error,
    isError,
    onSearch,
    filter,
    setFilter,
    hasNextPage,


    // conversation
    conversations,
    isLoadingConversations,
    errorConversations,
    isErrorConversations,

    // send message
    sendMessage,
    isErrorSendChat,
    isPending,

    // starred
    starredChat,

    // block chat
    blockChat,

    // media
    getChatMedia
  };
};

export default useChat;
