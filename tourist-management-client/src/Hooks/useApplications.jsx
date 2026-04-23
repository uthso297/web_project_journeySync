import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useApplications = () => {
    const axiosSecure = useAxiosSecure();
    const { data: applications = [], isPending: loadingApplications, refetch } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications')
            return res.data
        }
    })
    return [applications, loadingApplications, refetch]
};

export default useApplications;