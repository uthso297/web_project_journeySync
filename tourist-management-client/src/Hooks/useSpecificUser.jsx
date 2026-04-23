import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";

const useSpecificUser = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: specificUser = {}, error, refetch } = useQuery({
        queryKey: ["specificUser"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    if (error) {
        console.error("Error fetching user:", error.message);
    }
    
    return { specificUser, refetch }
};

export default useSpecificUser;