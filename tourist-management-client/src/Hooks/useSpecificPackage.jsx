import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSpecificPackage = ({ id }) => {
    const axiosPublic = useAxiosPublic();
    const { data: packages = [], isPending: loading, refetch } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tourPackages/${id}`)
            return res.data
        }
    })
    return [packages, loading, refetch]
};

export default useSpecificPackage;