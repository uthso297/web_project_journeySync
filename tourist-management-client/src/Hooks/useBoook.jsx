import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Components/AuthProvider';

const useBoook = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: book = [], isPending: loadingBook, refetch } = useQuery({
        queryKey: ['book'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/book/${user?.email}`)
            return res.data
        }
    })
    return [book, loadingBook, refetch]
};

export default useBoook;