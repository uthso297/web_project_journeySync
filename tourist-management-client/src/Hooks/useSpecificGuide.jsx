import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSpecificGuide = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: specificGuide = {}, error, refetch } = useQuery({
        queryKey: ["specificGuide"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/guides/${user?.email}`);
            return res.data;
        },
    });

    if (error) {
        console.error("Error fetching user:", error.message);
    }

    return { specificGuide, refetch }
};

export default useSpecificGuide;