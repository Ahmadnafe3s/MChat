import ChatApi from "@/services/chat";
import debounce from "@/utils/debounce";
import { useInfiniteQuery } from "@tanstack/react-query";

const useChat = () => {
  const { data } = useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: ({ pageParam }) =>
      ChatApi.getChats({
        id: 19,
        user_type: "user",
        self_id: 19,
        status: "Active",
        current_page: pageParam,
        per_page: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (last, allPages) => {
      console.log(last);
      return allPages.length + 1;
    },
  });



  const onSearch = debounce((value: string) => {
    console.log(value);
  }, 400);

  return {
    onSearch,
  };
};

export default useChat;
