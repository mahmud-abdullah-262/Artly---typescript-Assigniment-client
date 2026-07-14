import BannerSection from "../components/BannerSection";

import FeaturedCollections from "../components/FeaturedCollections";
import NewArrivalSections from "../components/NewArrivalSections";
import Newsletter from "../components/Newsletter";
import Promies from "../components/WhyChooseArtly";
import ReviewSections from "../components/ReviewSections";
import UpcomingEvent from "../components/ArtistOfTheDay";


const Home = () => {
  const getEmail = async (email: string): Promise<void> => {
    console.log('User emailed:', email);
  
  };

  return (
    <div>
      <BannerSection/>
      <FeaturedCollections />
      <NewArrivalSections />
      <Promies />
      <ReviewSections />
      <UpcomingEvent />
       <Newsletter 
        subscriberCount={1250} 
        onSubscribe={getEmail}
      />
    </div>
  );
};

export default Home;