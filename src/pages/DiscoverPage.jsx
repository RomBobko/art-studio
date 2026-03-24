import DiscoverHero from "../components/sections/discover/DiscoverHero/DiscoverHero";
import BrowseCategories from "../components/sections/discover/BrowseCategories/BrowseCategories";
import TrendingArtworks from "../components/sections/discover/TrendingArtworks/TrendingArtworks";
import FeaturedArtists from "../components/sections/discover/FeaturedArtists/FeaturedArtists";

const DiscoverPage = () => {
  return (
    <>
      <DiscoverHero />
      <BrowseCategories />
      <TrendingArtworks />
      <FeaturedArtists />
    </>
  );
};

export default DiscoverPage;
