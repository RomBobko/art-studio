import BrowseCategories from "../../components/BrowseCategories/BrowseCategories";
import DiscoverHero from "../../components/DiscoverHero/DiscoverHero";
import FeaturedArtists from "../../components/FeaturedArtists/FeaturedArtists";
import TrendingArtworks from "../../components/TrendingArtworks/TrendingArtworks";


const Discover = () => {
  return (
    <>
      <DiscoverHero />
      <BrowseCategories />
      <TrendingArtworks />
      <FeaturedArtists />

    </>
  );
};

export default Discover;
