import Hero from "../components/sections/home/Hero";
import Featured from "../components/sections/home/FeaturedCategories";
import ArtistSpotlight from "../components/sections/home/ArtistSpotlight";
import CuratedArtworks from "../components/sections/home/CuratedArtworks";
import AboutUs from "../components/sections/home/AboutUs";
import NewsletterSignup from "../components/sections/home/NewsletterSignup";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Featured />
      <ArtistSpotlight />
      <CuratedArtworks />
      <AboutUs />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;
