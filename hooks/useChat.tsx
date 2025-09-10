import ChatApi from "@/services/chat";
import debounce from "@/utils/debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

const useChat = () => {
  const [filter, setFilter] = useState("All");

  const { data, isLoading, isFetchingNextPage, fetchNextPage, error, isError } =
    useInfiniteQuery({
      queryKey: ["chats", filter],
      queryFn: ({ pageParam }) =>
        ChatApi.getChats({
          id: 19,
          user_type: "user",
          self_id: null,
          status: filter,
          page: pageParam,
          per_page: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: PaginatedChats) => {
        const { current_page, last_page } = lastPage;
        return current_page < last_page ? current_page + 1 : undefined;
      },
    });

  const onSearch = debounce((value: string) => {
    setFilter(value);
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
  };
};

export default useChat;
