import artwork1 from "../assets/images/artwork-1.webp";
import artwork2 from "../assets/images/artwork-2.webp";
import artwork3 from "../assets/images/artwork-3.webp";
import artwork4 from "../assets/images/artwork-4.webp";
import artwork5 from "../assets/images/artwork-5.webp";
import artwork6 from "../assets/images/artwork-6.webp";
import artwork7 from "../assets/images/artwork-7.webp";
import artwork8 from "../assets/images/artwork-8.webp";

const artworks = [
  {
    id: 1,
    title: "Vision in Color",
    image: artwork1,
    artistId: 1,
    categoryIds: [1],
    price: 350,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Acrylic on Canvas",
  },
  {
    id: 2,
    title: "Moonlit Peaks",
    image: artwork2,
    artistId: 2,
    categoryIds: [2],
    price: 280,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Digital Art",
  },
  {
    id: 3,
    title: "Blossom Hoops",
    image: artwork3,
    artistId: 3,
    categoryIds: [3],
    price: 190,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Floral Embroidery",
  },
  {
    id: 4,
    title: "Sacred Serenity",
    image: artwork4,
    artistId: 4,
    categoryIds: [4],
    price: 320,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Charcoal Sketch",
  },
  {
    id: 5,
    title: "Infinite Mandala",
    image: artwork5,
    artistId: 5,
    categoryIds: [6],
    price: 260,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Traditional Art",
  },
  {
    id: 6,
    title: "Eyes of Emotion",
    image: artwork6,
    artistId: 6,
    categoryIds: [4, 8],
    price: 210,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Graphite Sketch",
  },
  {
    id: 7,
    title: "Divine Cow",
    image: artwork7,
    artistId: 7,
    categoryIds: [6],
    price: 400,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Traditional Miniature Art",
  },
  {
    id: 8,
    title: "Peaceful Enlightenment",
    image: artwork8,
    artistId: 8,
    categoryIds: [1],
    price: 500,
    year: 2024,
    isFeatured: false,
    isTrending: true,
    type: "Acrylic Painting",
  },
];

export default artworks;