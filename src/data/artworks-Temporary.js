import imagePlaceholder from "../assets/placeholders/imagePlaceholder.webP";

const makeArtwork = (id, title, slug, artistId, categoryIds) => ({
  id,
  title,
  slug,
  image: imagePlaceholder,
  artistId,
  categoryIds,
  price: 100,
  year: 2024,
  isFeatured: false,
  isTrending: false,
  type: "Temporary Artwork",
});

const artworks = [
  makeArtwork(1, "Artwork 1", "artwork-1", 1, [1, 2, 3, 4]),
  makeArtwork(2, "Artwork 2", "artwork-2", 2, [2, 3, 4, 5]),
  makeArtwork(3, "Artwork 3", "artwork-3", 3, [3, 4, 5, 6]),
  makeArtwork(4, "Artwork 4", "artwork-4", 1, [4, 5, 6, 7]),
  makeArtwork(5, "Artwork 5", "artwork-5", 2, [5, 6, 7, 8]),
  makeArtwork(6, "Artwork 6", "artwork-6", 3, [6, 7, 8, 1]),
  makeArtwork(7, "Artwork 7", "artwork-7", 1, [7, 8, 1, 2]),
  makeArtwork(8, "Artwork 8", "artwork-8", 2, [8, 1, 2, 3]),

  makeArtwork(9, "Artwork 9", "artwork-9", 3, [1, 2, 3, 4]),
  makeArtwork(10, "Artwork 10", "artwork-10", 1, [2, 3, 4, 5]),
  makeArtwork(11, "Artwork 11", "artwork-11", 2, [3, 4, 5, 6]),
  makeArtwork(12, "Artwork 12", "artwork-12", 3, [4, 5, 6, 7]),
  makeArtwork(13, "Artwork 13", "artwork-13", 1, [5, 6, 7, 8]),
  makeArtwork(14, "Artwork 14", "artwork-14", 2, [6, 7, 8, 1]),
  makeArtwork(15, "Artwork 15", "artwork-15", 3, [7, 8, 1, 2]),
  makeArtwork(16, "Artwork 16", "artwork-16", 1, [8, 1, 2, 3]),
];

export default artworks;