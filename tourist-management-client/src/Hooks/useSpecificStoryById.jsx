import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSpecificStoryById = (id) => {
    const axiosSecure = useAxiosSecure();

    const { data: specificStory = [], isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["specificStory"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/story/${id}`);
            return res.data;
        },
    });

    if (error) {
        console.error("Error fetching user:", error.message);
    }

    return [specificStory, isLoading, refetch]
};

export default useSpecificStoryById;