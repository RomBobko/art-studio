import artists from "./artists";

const artistNamesById = Object.fromEntries(
  artists.map((artist) => [artist.id, artist.name]),
);

export const toArtworkCardProps = (artwork) => ({
  title: artwork.title,
  slug: artwork.slug,
  price: artwork.price,
  medium: artwork.medium,
  artistName: artistNamesById[artwork.artistId] || "Unknown artist",
  image: artwork.image,
});
