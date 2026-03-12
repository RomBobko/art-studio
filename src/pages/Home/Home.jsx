import Hero from "../../components/Hero/Hero";
import Featured from "../../components/Featured/Featured";
import ArtistSpotlight from "../../components/ArtistSpotlight/ArtistSpotlight";
import CuratedArtworks from "../../components/CuratedArtworks/CuratedArtworks";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <ArtistSpotlight />
      <CuratedArtworks />
    </>
  );
};

export default Home;
