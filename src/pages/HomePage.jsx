import Hero from "../components/sections/home/Hero/Hero";
import Featured from "../components/sections/home/FeaturedCategories/FeaturedCategories";
import ArtistSpotlight from "../components/sections/home/ArtistSpotlight/ArtistSpotlight";
import CuratedArtworks from "../components/sections/home/CuratedArtworks/CuratedArtworks";
import AboutUs from "../components/sections/home/AboutUs/AboutUs";
import StartSelling from "../components/sections/home/StartSelling/StartSelling";
import NewsletterSignup from "../components/sections/home/NewsletterSignup/NewsletterSignup";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Featured />
      <ArtistSpotlight />
      <CuratedArtworks />
      <AboutUs />
      <StartSelling />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;
