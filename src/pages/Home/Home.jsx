import Hero from "../../components/Hero/Hero";
import Featured from "../../components/Featured/Featured";
import ArtistSpotlight from "../../components/ArtistSpotlight/ArtistSpotlight";
import CuratedArtworks from "../../components/CuratedArtworks/CuratedArtworks";
import AboutUs from "../../components/AboutUs/AboutUs";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <ArtistSpotlight />
      <CuratedArtworks />
      <AboutUs />
    </>
  );
};

export default Home;
