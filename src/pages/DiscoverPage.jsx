import { useState } from "react";
import DiscoverHero from "../components/sections/discover/DiscoverHero/DiscoverHero";
import BrowseCategories from "../components/sections/discover/BrowseCategories/BrowseCategories";
import TrendingArtworks from "../components/sections/discover/TrendingArtworks/TrendingArtworks";
import FeaturedArtists from "../components/sections/discover/FeaturedArtists/FeaturedArtists";
import artworks from "../data/artworks";
import artists from "../data/artists";

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearchQuery = searchQuery
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  const artistNamesById = Object.fromEntries(
    artists.map((artist) => [artist.id, artist.name]),
  );

  const defaultArtworks = artworks
    .filter((artwork) => artwork.isTrending)
    .slice(0, 8);

  const visibleArtworks = normalizedSearchQuery
    ? defaultArtworks.filter((artwork) => {
        const searchText = [
          artwork.title,
          artwork.medium,
          artistNamesById[artwork.artistId] || "",
        ]
          .join(" ")
          .toLowerCase();

        return searchText.includes(normalizedSearchQuery);
      })
    : defaultArtworks;

  return (
    <>
      <DiscoverHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <BrowseCategories />
      <TrendingArtworks
        artworks={visibleArtworks}
        hasActiveSearch={Boolean(normalizedSearchQuery)}
      />
      <FeaturedArtists />
    </>
  );
};

export default DiscoverPage;
