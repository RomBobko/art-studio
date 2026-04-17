import lippanArtImage from "../assets/images/lippanArt.webp";
import craftsImage from "../assets/images/crafts.webp";
import sketchImage from "../assets/images/sketch.webp";
import paintingsImage from "../assets/images/paintings.webp";
import traditionalArtImage from "../assets/images/traditionalArt.webp";
import illustrationImage from "../assets/images/illustration.webp";
import resinArtImage from "../assets/images/resinArt.webp";

import elenaAvatar from "../assets/images/artists/elena-novak.webp";
import lucasAvatar from "../assets/images/artists/lucas-bennett.webp";
import sophieAvatar from "../assets/images/artists/sophie-laurent.webp";
import claraAvatar from "../assets/images/artists/clara-moreau.webp";
import ameliaAvatar from "../assets/images/artists/amelia-brooks.webp";
import evaAvatar from "../assets/images/artists/eva-muller.webp";
import danielAvatar from "../assets/images/artists/daniel-kovac.webp";

const tutorials = [
  {
    id: 1,
    slug: "mandala-wall-hanging-basics",
    title: "Mandala Wall Hanging Basics",
    description:
      "Learn how to build a clean wall-hanging design with simple shapes, mirrored details, and beginner-friendly finishing steps.",
    category: "Lippan Art",
    level: "Beginner",
    image: lippanArtImage,
    authorName: "Clara Moreau",
    authorAvatar: claraAvatar,
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
    category: "Crafts",
    level: "Beginner",
    image: craftsImage,
    authorName: "Sophie Laurent",
    authorAvatar: sophieAvatar,
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
    category: "Sketch",
    level: "Beginner",
    image: sketchImage,
    authorName: "Amelia Brooks",
    authorAvatar: ameliaAvatar,
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
    category: "Paintings",
    level: "Intermediate",
    image: paintingsImage,
    authorName: "Daniel Kovac",
    authorAvatar: danielAvatar,
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
    category: "Traditional Art",
    level: "Beginner",
    image: traditionalArtImage,
    authorName: "Elena Novak",
    authorAvatar: elenaAvatar,
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
    category: "Illustration",
    level: "Intermediate",
    image: illustrationImage,
    authorName: "Lucas Bennett",
    authorAvatar: lucasAvatar,
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
    category: "Resin Art",
    level: "Beginner",
    image: resinArtImage,
    authorName: "Eva Muller",
    authorAvatar: evaAvatar,
    duration: "39 min",
    lessonsCount: 5,
    isFeatured: true,
  },
];

export default tutorials;
