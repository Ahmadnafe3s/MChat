import ChatApi from "@/services/chat";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import debounce from "@/utils/debounce";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useChat = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuthStore()
  const { selectedChat } = useChatStore()

  const { data, isLoading, isFetchingNextPage, fetchNextPage, error, isError } =
    useInfiniteQuery({
      queryKey: ["chats", filter, search],
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
  };
};

export default useChat;
