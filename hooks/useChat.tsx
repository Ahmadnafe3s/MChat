import ChatApi from "@/services/chat";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import debounce from "@/utils/debounce";
import generateOptMessage from "@/utils/generateOptMessage";
import { useFocusEffect } from "@react-navigation/native";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

const useChat = (screen?: "chats" | "conversation") => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuthStore();
  const { selectedChat, setStarred } = useChatStore();

  const queryClient = useQueryClient();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, refetch, error, isError , hasNextPage } =
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
      staleTime: 0,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
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
    enabled: !!selectedChat?.id && screen === "conversation",
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
      console.log("Error encountered in sending message: ", Err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", selectedChat?.id!],
      });
    },
  });

  // Sending Post Request
  const { mutate: setStarredMutation, isPending: isPendingStarred } =
    useMutation({
      mutationFn: () => ChatApi.setStarred(selectedChat?.id!),
      onSuccess: (data: { status: string }) => {
        setStarred(data.status);
      },
      onError: () => {
        Alert.alert("Error", "Error while starring the chat");
      },
    });

  const onSearch = debounce((value: string) => {
    setSearch(value);
  }, 400);

  const chats = data?.pages.flatMap((page) => page?.data ?? []) ?? [];

  // refetch on focus root
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  )


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
    setStarredMutation,
    isPendingStarred,
  };
};

export default useChat;
