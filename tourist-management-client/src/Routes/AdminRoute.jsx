import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import { BallTriangle } from "react-loader-spinner";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={location?.pathname}></Navigate>

};

export default AdminRoute;