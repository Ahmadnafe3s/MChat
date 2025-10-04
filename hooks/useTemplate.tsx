import TemplateApi from '@/services/template'
import { useAuthStore } from '@/store/auth'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const useTemplate = () => {

    const { user } = useAuthStore()

    const getTemplate = useQuery({
        queryKey: ["template", user?.id],
        queryFn: () => TemplateApi.getTemplates({ value: user?.id! }),
        enabled: !!user?.id,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData
    })


    return {
        getTemplate
    }
}

export default useTemplate