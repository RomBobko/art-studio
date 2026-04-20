import lippanArtImage from "../assets/images/lippanArt.webp";
import craftsImage from "../assets/images/crafts.webp";
import sketchImage from "../assets/images/sketch.webp";
import paintingsImage from "../assets/images/paintings.webp";
import traditionalArtImage from "../assets/images/traditionalArt.webp";
import illustrationImage from "../assets/images/illustration.webp";
import resinArtImage from "../assets/images/resinArt.webp";

const tutorials = [
  {
    id: 1,
    slug: "mandala-wall-hanging-basics",
    title: "Mandala Wall Hanging Basics",
    description:
      "Learn how to build a clean wall-hanging design with simple shapes, mirrored details, and beginner-friendly finishing steps.",
    categoryId: 7,
    level: "Beginner",
    image: lippanArtImage,
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
    image: craftsImage,
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
    image: sketchImage,
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
    image: paintingsImage,
    authorId: 2,
    duration: "58 min",
    lessonsCount: 8,
    isFeatured: false,
  },
  {
    id: 5,
    slug: "folk-ornament-composition",
    title: "Folk Ornament Composition",
    description:
      "Arrange symbolic patterns with stronger rhythm and spacing so your decorative pieces feel complete and intentional.",
    categoryId: 5,
    level: "Beginner",
    image: traditionalArtImage,
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
    image: illustrationImage,
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
    image: resinArtImage,
    authorId: 6,
    duration: "39 min",
    lessonsCount: 5,
    isFeatured: true,
  },
];

export default tutorials;
