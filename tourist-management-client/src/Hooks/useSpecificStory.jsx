import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSpecificStory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: specificStories = [], isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["specificStories"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/${user?.email}`);
            return res.data;
        },
    });

    if (error) {
        console.error("Error fetching user:", error.message);
    }

    return [specificStories, isLoading, refetch]
};

export default useSpecificStory;