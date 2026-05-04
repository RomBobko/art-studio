import blossomImage from "../assets/images/blossom.webp";
import colorStormImage from "../assets/images/artworks/abstract/color-storm.webp";
import fracturedGazeImage from "../assets/images/artworks/abstract-faces/fractured-gaze.webp";
import goodVibeStonesImage from "../assets/images/artworks/crafts/good-vibe-stones.webp";

const currentChallenge = {
  id: 1,
  slug: "spring-light-study",
  title: "Spring Light Study",
  theme: "Soft seasonal light",
  brief:
    "Create an artwork inspired by the feeling of early spring light using any medium you enjoy.",
  coverImage: blossomImage,
  deadline: "2026-06-21",
  status: "active",
  allowedMedia: "Open medium",
  prize: "Featured on the Challenges page",
};

const pastChallenges = [
  {
    id: 2,
    slug: "texture-stories",
    title: "Texture Stories",
    theme: "Visible texture and surface detail",
    brief: "Build a piece around visible texture and layered material details.",
    coverImage: fracturedGazeImage,
    deadline: "2026-03-31",
    status: "closed",
    winnerArtistId: 6,
    winningArtworkTitle: "Fractured Gaze",
  },
  {
    id: 3,
    slug: "night-palette",
    title: "Night Palette",
    theme: "Limited evening color studies",
    brief: "Explore a restrained palette inspired by evening scenes and low light.",
    coverImage: colorStormImage,
    deadline: "2026-02-28",
    status: "closed",
    winnerArtistId: 2,
    winningArtworkTitle: "Color Storm",
  },
  {
    id: 4,
    slug: "handmade-patterns",
    title: "Handmade Patterns",
    theme: "Decorative repeated shapes",
    brief: "Create a design using repeated decorative shapes and handmade rhythm.",
    coverImage: goodVibeStonesImage,
    deadline: "2026-01-31",
    status: "closed",
    winnerArtistId: 4,
    winningArtworkTitle: "Good Vibe Stones",
  },
];

export { currentChallenge, pastChallenges };
