import Hero from "../../components/Hero/Hero";
import Featured from "../../components/Featured/Featured";
import ArtistSpotlight from "../../components/ArtistSpotlight/ArtistSpotlight";
import CuratedArtworks from "../../components/CuratedArtworks/CuratedArtworks";
import AboutUs from "../../components/AboutUs/AboutUs";
import StartSelling from "../../components/StartSelling/StartSelling";
import NewsletterSignup from "../../components/NewsletterSignup/NewsletterSignup";

const Home = () => {
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

export default Home;
