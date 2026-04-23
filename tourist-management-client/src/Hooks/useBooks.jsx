import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useBooks = () => {
    const axiosSecure = useAxiosSecure();
    const { data: books = [], isPending: loadingBooks, refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`)
            return res.data
        }
    })
    return [books, loadingBooks, refetch]
};

export default useBooks;