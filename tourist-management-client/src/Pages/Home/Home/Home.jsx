import PageTitle from "../../../Components/PageTitle";
import Cover from "../../../Shared/Cover/Cover";
import Blog from "../Blog Section/Blog";
import Embark from "../EmbarkJourneySection/Embark";
import Newsletter from "../NewsLetter/Newsletter";
import OverviewSection from "../OverView/OverviewSection";
import PackageGuideHome from "../PackageAndGuideSection/PackageAndGuide/PackageGuideHome";
import RatingSlider from "../Review/RatingSlider";
import TouristStoryHome from "../TouristStory/TouristStoryHome";

const Home = () => {
    return (
        <div>
            <PageTitle title="Home || JourneySync"></PageTitle>
            <Cover></Cover>
            <OverviewSection></OverviewSection>
            <PackageGuideHome></PackageGuideHome>
            <TouristStoryHome></TouristStoryHome>
            <Blog></Blog>
            <Embark></Embark>
            <RatingSlider></RatingSlider>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;