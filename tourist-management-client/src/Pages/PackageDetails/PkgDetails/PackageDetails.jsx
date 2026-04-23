import { useLoaderData } from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import TourInfo from "../TourInfo/TourInfo";
import TourPlan from "../TourPlan/TourPlan";
import BookingForm from "../BookForm/BookingForm";
import { useContext } from "react";
import { AuthContext } from "../../../Components/AuthProvider";

const PackageDetails = () => {
    const datas = useLoaderData();
    const data = datas.package[0];
    const { photos, tourInformation, tripTitle, tourPlan, price } = data;
    const { user } = useContext(AuthContext);
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userPhoto = user?.photoURL;

    return (
        <div className="bg-ink-50/30">
            <Gallery photos={photos} tripTitle={tripTitle} price={price} tourType={data.tourType} />
            <div className="container-page py-10 lg:py-14 grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    <TourInfo tourInformation={tourInformation} tripTitle={tripTitle} />
                    <TourPlan tourPlan={tourPlan} />
                </div>
                <div className="lg:col-span-2">
                    <div className="lg:sticky lg:top-24">
                        <BookingForm
                            touristName={userName}
                            touristEmail={userEmail}
                            touristImage={userPhoto}
                            price={price}
                            packageTitle={tripTitle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
