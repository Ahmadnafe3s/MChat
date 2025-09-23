import ChatApi from "@/services/chat";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import debounce from "@/utils/debounce";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

const useChat = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuthStore()
  const { selectedChat } = useChatStore()

  const queryClient = useQueryClient();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, error, isError } =
    useInfiniteQuery({
      queryKey: ["chats", filter, search, user?.id],
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
    });


  const { data: conversations, isLoading: isLoadingConversations, error: errorConversations, isError: isErrorConversations } = useQuery({
    queryKey: ["conversations", selectedChat?.id],
    queryFn: () => ChatApi.getConversations(selectedChat?.id!),
    enabled: !!selectedChat?.id,
  })


  const { mutate: sendMessage, isError: isErrorSendChat, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: ({ receiverId, data }: { receiverId: number, data: any }) => ChatApi.sendMessage({ receiverId, data }),
    onSuccess: (newData: Conversations) => {
      queryClient.setQueryData(["conversations", selectedChat?.id!], (oldData: Conversations[]) => {
        if (!oldData) return [newData]
        return [newData, ...oldData]
      })
    },
    onError: (error: AxiosError<{ message: { error: { message: string } } }>) => {
      const Err = error.response?.data.message || error.message
      console.log("Error encountered in sending message: ", Err)
    },
  })


  const onSearch = debounce((value: string) => {
    setSearch(value);
  }, 400);

  return {
    chats: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    totalChats: data?.pages.flat()[0].total ?? 0,
    error,
    isError,
    onSearch,
    filter,
    setFilter,

    // conversation
    conversations,
    isLoadingConversations,
    errorConversations,
    isErrorConversations,

    // send message
    sendMessage,
    isErrorSendChat,
    isPending,
  };
};

export default useChat;
