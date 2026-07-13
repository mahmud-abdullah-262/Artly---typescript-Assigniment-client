import BannerSection from "../components/BannerSection";
import Banner from "../components/BannerSection";
import FeaturedCollections from "../components/FeaturedCollections";
import NewArrivalSections from "../components/NewArrivalSections";
import Newsletter from "../components/Newsletter";
import Promies from "../components/WhyChooseArtly";
import ReviewSections from "../components/ReviewSections";
import UpcomingEvent from "../components/ArtistOfTheDay";


const Home = () => {
  return (
    <div>
      <BannerSection/>
      <FeaturedCollections />
      <NewArrivalSections />
      <Promies />
      <ReviewSections />
      <UpcomingEvent />
      <Newsletter />
    </div>
  );
};

export default Home;