import ChatApi from "@/services/chat";
import { useAuthStore } from "@/store/auth";
import debounce from "@/utils/debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

const useChat = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuthStore()


  const { data, isLoading, isFetchingNextPage, fetchNextPage, error, isError } =
    useInfiniteQuery({
      queryKey: ["chats", filter, search],
      queryFn: ({ pageParam }) =>
        ChatApi.getChats({
          id: 19,
          user_type: user?.user_type!,
          self_id: user?.self_id!,
          status: filter,
          parent_id: user?.parent_id!,
          page: pageParam,
          serach: search,
          per_page: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: PaginatedChats) => {
        const { current_page, last_page } = lastPage;
        return current_page < last_page ? current_page + 1 : undefined;
      },
    });

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
  };
};

export default useChat;
