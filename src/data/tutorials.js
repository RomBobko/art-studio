import colorStormImage from "../assets/images/artworks/abstract/color-storm.webp";
import fracturedGazeImage from "../assets/images/artworks/abstract-faces/fractured-gaze.webp";
import goodVibeStonesImage from "../assets/images/artworks/crafts/good-vibe-stones.webp";
import softCharacterImage from "../assets/images/artworks/illustration/soft-character.webp";
import rainyNightImage from "../assets/images/artworks/paintings/rainy-night.webp";
import workshopPourImage from "../assets/images/artworks/resin-art/workshop-pour.webp";
import koreanGirlStudyImage from "../assets/images/artworks/sketch/korean-girl-study.webp";

const tutorials = [
  {
    id: 1,
    slug: "abstract-composition-basics",
    title: "Abstract Composition Basics",
    description:
      "Learn how to arrange simple shapes, color blocks, and layered marks into a balanced abstract artwork.",
    categoryId: 7,
    level: "Beginner",
    image: colorStormImage,
    authorId: 6,
    duration: "42 min",
    lessonsCount: 6,
    isFeatured: false,
  },
  {
    id: 2,
    slug: "handmade-home-decor-patterns",
    title: "Handmade Home Decor Patterns",
    description:
      "Practice repeatable decorative motifs and learn how to turn them into polished craft pieces for walls and shelves.",
    categoryId: 3,
    level: "Beginner",
    image: goodVibeStonesImage,
    authorId: 4,
    duration: "36 min",
    lessonsCount: 5,
    isFeatured: false,
  },
  {
    id: 3,
    slug: "sketching-light-and-shadow",
    title: "Sketching Light and Shadow",
    description:
      "Build stronger pencil studies by blocking shapes first and adding light, contrast, and texture in simple stages.",
    categoryId: 4,
    level: "Beginner",
    image: koreanGirlStudyImage,
    authorId: 5,
    duration: "54 min",
    lessonsCount: 7,
    isFeatured: false,
  },
  {
    id: 4,
    slug: "acrylic-color-foundations",
    title: "Acrylic Color Foundations",
    description:
      "Start with a limited palette and learn how to mix balanced colors for landscapes, studies, and expressive painting work.",
    categoryId: 1,
    level: "Intermediate",
    image: rainyNightImage,
    authorId: 2,
    duration: "58 min",
    lessonsCount: 8,
    isFeatured: false,
  },
  {
    id: 5,
    slug: "expressive-abstract-faces",
    title: "Expressive Abstract Faces",
    description:
      "Practice distorted face shapes, bold acrylic texture, and rough brush strokes for expressive figurative artwork.",
    categoryId: 5,
    level: "Beginner",
    image: fracturedGazeImage,
    authorId: 6,
    duration: "47 min",
    lessonsCount: 6,
    isFeatured: true,
  },
  {
    id: 6,
    slug: "illustrated-character-posters",
    title: "Illustrated Character Posters",
    description:
      "Combine character sketching, layout, and texture overlays to create a simple poster with a finished digital look.",
    categoryId: 8,
    level: "Intermediate",
    image: softCharacterImage,
    authorId: 3,
    duration: "65 min",
    lessonsCount: 9,
    isFeatured: true,
  },
  {
    id: 7,
    slug: "resin-textures-for-beginners",
    title: "Resin Textures for Beginners",
    description:
      "Understand the basics of layering, flow, and texture so your resin work looks more controlled and visually rich.",
    categoryId: 6,
    level: "Beginner",
    image: workshopPourImage,
    authorId: 6,
    duration: "39 min",
    lessonsCount: 5,
    isFeatured: true,
  },
];

export default tutorials;
