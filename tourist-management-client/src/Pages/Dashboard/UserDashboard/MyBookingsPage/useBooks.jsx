import { useContext } from "react";
import { AuthContext } from "../../../../Components/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useBoooks = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: books = [], isPending: loadingBooks, refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${user?.email}`)
            return res.data
        }
    })
    return [books, loadingBooks, refetch]
};

export default useBoooks;