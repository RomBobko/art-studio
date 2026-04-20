import artists from "./artists";
import artworks from "./artworks";

const curatedArtworkIds = [1, 7, 10, 16];
const artistsById = Object.fromEntries(artists.map((artist) => [artist.id, artist]));

const curatedArtworks = curatedArtworkIds
  .map((artworkId) => artworks.find((artwork) => artwork.id === artworkId))
  .filter(Boolean)
  .map((artwork) => {
    const artist = artistsById[artwork.artistId];

    return {
      id: artwork.id,
      slug: artwork.slug,
      title: artwork.title,
      image: artwork.image,
      artistName: artist?.name || "Unknown artist",
      artistSlug: artist?.slug || "",
    };
  });

export default curatedArtworks;
