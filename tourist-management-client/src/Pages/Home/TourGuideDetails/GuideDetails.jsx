import { useParams } from "react-router-dom";
import Guide from "./Guide";
import Story from "./Story";

const GuideDetails = () => {
    const params = useParams()
    const email = params.email
    console.log(email);
    return (
        <div>
            <Guide email={email}></Guide>
            <Story email={email}></Story>
        </div>
    );
};

export default GuideDetails;