import joinChallengeImage from "../assets/images/joinChallenge.png";
import abstractImage from "../assets/images/abstract.webp";
import craftsImage from "../assets/images/crafts.webp";
import traditionalArtImage from "../assets/images/traditionalArt.webp";

const currentChallenge = {
  id: 1,
  slug: "spring-light-study",
  title: "Spring Light Study",
  theme: "Soft seasonal light",
  brief:
    "Create an artwork inspired by the feeling of early spring light using any medium you enjoy.",
  coverImage: joinChallengeImage,
  deadline: "2026-05-10",
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
    coverImage: traditionalArtImage,
    deadline: "2026-03-31",
    status: "closed",
    winnerArtistId: 6,
    winningArtworkTitle: "Sacred Geometry",
  },
  {
    id: 3,
    slug: "night-palette",
    title: "Night Palette",
    theme: "Limited evening color studies",
    brief: "Explore a restrained palette inspired by evening scenes and low light.",
    coverImage: abstractImage,
    deadline: "2026-02-28",
    status: "closed",
    winnerArtistId: 2,
    winningArtworkTitle: "Inner Flame",
  },
  {
    id: 4,
    slug: "handmade-patterns",
    title: "Handmade Patterns",
    theme: "Decorative repeated shapes",
    brief: "Create a design using repeated decorative shapes and handmade rhythm.",
    coverImage: craftsImage,
    deadline: "2026-01-31",
    status: "closed",
    winnerArtistId: 4,
    winningArtworkTitle: "Thread Garden",
  },
];

export { currentChallenge, pastChallenges };
