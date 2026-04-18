import joinChallengeImage from "../assets/images/joinChallenge.png";
import sunsetImage from "../assets/images/sunset.webp";
import blossomImage from "../assets/images/blossom.webp";
import cityscapeImage from "../assets/images/cityscape.webp";
import abstractImage from "../assets/images/abstract.webp";
import traditionalArtImage from "../assets/images/traditionalArt.webp";
import craftsImage from "../assets/images/crafts.webp";

const currentChallenge = {
  id: 1,
  title: "Spring Light Study",
  theme: "Soft seasonal light",
  description:
    "Create an artwork inspired by the feeling of early spring light using any medium you enjoy.",
  deadline: "May 10, 2026",
  format: "Open medium",
  prize: "Featured on the Challenges page",
  image: joinChallengeImage,
  imageAlt: "Artist painting for a creative challenge",
};

const initialSubmissions = [
  {
    id: 1,
    artistName: "Elena Novak",
    artworkTitle: "Morning Window",
    image: blossomImage,
    imageAlt: "Floral artwork with soft spring colors",
    medium: "Acrylic on canvas",
    note: "Warm indoor light with soft shadow shapes.",
  },
  {
    id: 2,
    artistName: "Lucas Bennett",
    artworkTitle: "Quiet Bloom",
    image: sunsetImage,
    imageAlt: "Landscape artwork with warm sunset tones",
    medium: "Digital illustration",
    note: "A calm floral scene with pale sunrise tones.",
  },
  {
    id: 3,
    artistName: "Amelia Brooks",
    artworkTitle: "Light on Paper",
    image: cityscapeImage,
    imageAlt: "City artwork with layered light and shadow",
    medium: "Graphite sketch",
    note: "A simple still life focused on contrast and soft highlights.",
  },
];

const pastChallenges = [
  {
    id: 1,
    title: "Texture Stories",
    month: "March 2026",
    image: traditionalArtImage,
    imageAlt: "Textured traditional artwork",
    theme: "Build a piece around visible texture and surface detail.",
    winnerName: "Clara Moreau",
  },
  {
    id: 2,
    title: "Night Palette",
    month: "February 2026",
    image: abstractImage,
    imageAlt: "Abstract artwork with deep evening colors",
    theme: "Explore limited colors inspired by evening scenes.",
    winnerName: "Daniel Kovac",
  },
  {
    id: 3,
    title: "Handmade Patterns",
    month: "January 2026",
    image: craftsImage,
    imageAlt: "Decorative handmade craft artwork",
    theme: "Create a design using repeated decorative shapes.",
    winnerName: "Sophie Laurent",
  },
];

export { currentChallenge, initialSubmissions, pastChallenges };
