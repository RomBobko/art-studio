import { useState } from "react";
import DiscoverHero from "../components/sections/discover/DiscoverHero/DiscoverHero";
import BrowseCategories from "../components/sections/discover/BrowseCategories/BrowseCategories";
import TrendingArtworks from "../components/sections/discover/TrendingArtworks/TrendingArtworks";
import FeaturedArtists from "../components/sections/discover/FeaturedArtists/FeaturedArtists";
import artworks from "../data/artworks";
import artists from "../data/artists";
import categories from "../data/categories";

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearchQuery = searchQuery
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  const artistNamesById = Object.fromEntries(
    artists.map((artist) => [artist.id, artist.name]),
  );
  const categoryNamesById = Object.fromEntries(
    categories.map((category) => [category.id, category.name]),
  );

  const trendingArtworks = artworks
    .filter((artwork) => artwork.isTrending)
    .slice(0, 8);
  const searchableArtworks = normalizedSearchQuery ? artworks : trendingArtworks;

  const visibleArtworks = normalizedSearchQuery
    ? searchableArtworks.filter((artwork) => {
        const searchText = [
          artwork.title,
          artwork.medium,
          artistNamesById[artwork.artistId] || "",
          categoryNamesById[artwork.categoryId] || "",
          ...(artwork.styleTags || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchText.includes(normalizedSearchQuery);
      })
    : trendingArtworks;

  return (
    <>
      <DiscoverHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <BrowseCategories />
      <TrendingArtworks
        title={normalizedSearchQuery ? "Search Results" : "Trending Artworks"}
        artworks={visibleArtworks}
        hasActiveSearch={Boolean(normalizedSearchQuery)}
      />
      <FeaturedArtists />
    </>
  );
};

export default DiscoverPage;
