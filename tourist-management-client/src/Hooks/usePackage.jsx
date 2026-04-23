import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePackage = () => {
    const axiosPublic = useAxiosPublic();
    const { data: packages = [], isPending: loading, refetch } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tourPackages')
            return res.data
        }
    })
    return [packages, loading, refetch]
};

export default usePackage;