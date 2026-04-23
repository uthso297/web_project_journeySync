import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import checkGuide from "../Hooks/checkGuide";
import { Navigate, useLocation } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";


const GuideRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isGuide, isGuideLoading] = checkGuide();
    const location = useLocation();

    if (loading || isGuideLoading) {
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

    if (user && isGuide) {
        return children;
    }

    return <Navigate to="/" state={location?.pathname}></Navigate>

};

export default GuideRoute;