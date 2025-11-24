import { contactApi } from '@/services/contact'
import { useAuthStore } from '@/store/auth'
import debounce from '@/utils/debounce'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

const useContact = () => {

    const { user } = useAuthStore()
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const getConatct = useInfiniteQuery({
        queryKey: ["Contacts", user?.id, search, status],
        queryFn: ({ pageParam }) =>
            contactApi.getContacts({
                value: user?.id!,
                status,
                page: pageParam,
                attribute: user?.attribute!,
                search,
                per_page: 10,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: paginatedContacts) => {
            const { current_page, last_page } = lastPage;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        enabled: !!user?.id,
    });

    const onSearch = debounce((value: string) => {
        setSearch(value);
    }, 400);

    return {
        getConatct,
        onSearch,
        search,
        status,
        setStatus
    }
}

export default useContact