import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Components/AuthProvider";
import { BallTriangle } from "react-loader-spinner";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
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

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

export default PrivateRoute;