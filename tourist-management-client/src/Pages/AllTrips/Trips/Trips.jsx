import PageTitle from "../../../Components/PageTitle";
import CoverTrips from "./Cover/CoverTrips";
import Description from "./Description";
import PackagesTrips from "./PackagesTrips";

const Trips = () => {
    return (
        <div>
            <PageTitle title="Trips || JourneySync"></PageTitle>
            <CoverTrips></CoverTrips>
            <Description></Description>
            <PackagesTrips></PackagesTrips>
        </div>
    );
};

export default Trips;