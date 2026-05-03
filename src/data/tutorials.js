import colorStormImage from "../assets/images/artworks/abstract/color-storm.webp";
import tripleRhythmImage from "../assets/images/artworks/abstract/triple-rhythm.webp";
import fracturedGazeImage from "../assets/images/artworks/abstract-faces/fractured-gaze.webp";
import looseLinesImage from "../assets/images/artworks/abstract-faces/loose-lines.webp";
import artisanHandsImage from "../assets/images/artworks/crafts/artisan-hands.webp";
import goodVibeStonesImage from "../assets/images/artworks/crafts/good-vibe-stones.webp";
import chromeDreamImage from "../assets/images/artworks/digital-art/chrome-dream.webp";
import signalPortraitImage from "../assets/images/artworks/digital-art/signal-portrait.webp";
import lotusInkImage from "../assets/images/artworks/illustration/lotus-ink.webp";
import softCharacterImage from "../assets/images/artworks/illustration/soft-character.webp";
import alpineLightImage from "../assets/images/artworks/paintings/alpine-light.webp";
import rainyNightImage from "../assets/images/artworks/paintings/rainy-night.webp";
import oceanPanelsImage from "../assets/images/artworks/resin-art/ocean-panels.webp";
import workshopPourImage from "../assets/images/artworks/resin-art/workshop-pour.webp";
import fieldSketchbookImage from "../assets/images/artworks/sketch/field-sketchbook.webp";
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
  {
    id: 8,
    slug: "layered-abstract-texture",
    title: "Layered Abstract Texture",
    description:
      "Use repeating forms, dry brush marks, and simple contrast to build a textured abstract study.",
    categoryId: 7,
    level: "Intermediate",
    image: tripleRhythmImage,
    authorId: 2,
    duration: "44 min",
    lessonsCount: 6,
    isFeatured: false,
  },
  {
    id: 9,
    slug: "digital-color-moodboards",
    title: "Digital Color Moodboards",
    description:
      "Build a clean digital palette study using bold light, simple shapes, and organized visual references.",
    categoryId: 2,
    level: "Beginner",
    image: chromeDreamImage,
    authorId: 3,
    duration: "40 min",
    lessonsCount: 5,
    isFeatured: false,
  },
  {
    id: 10,
    slug: "glitch-portrait-effects",
    title: "Glitch Portrait Effects",
    description:
      "Create a stylized digital portrait with layered color shifts, soft distortion, and clean finishing details.",
    categoryId: 2,
    level: "Intermediate",
    image: signalPortraitImage,
    authorId: 3,
    duration: "62 min",
    lessonsCount: 8,
    isFeatured: true,
  },
  {
    id: 11,
    slug: "abstract-face-thumbnail-studies",
    title: "Abstract Face Thumbnail Studies",
    description:
      "Sketch several expressive face ideas quickly before choosing one direction for a larger painting.",
    categoryId: 5,
    level: "Beginner",
    image: looseLinesImage,
    authorId: 6,
    duration: "35 min",
    lessonsCount: 5,
    isFeatured: false,
  },
  {
    id: 12,
    slug: "ink-details-for-illustration",
    title: "Ink Details for Illustration",
    description:
      "Add decorative ink lines, calm shapes, and small texture details to make an illustration feel complete.",
    categoryId: 8,
    level: "Beginner",
    image: lotusInkImage,
    authorId: 4,
    duration: "38 min",
    lessonsCount: 5,
    isFeatured: false,
  },
  {
    id: 13,
    slug: "painting-light-with-acrylic",
    title: "Painting Light with Acrylic",
    description:
      "Practice blocking warm light and cool shadows so a simple scene feels atmospheric and balanced.",
    categoryId: 1,
    level: "Intermediate",
    image: alpineLightImage,
    authorId: 1,
    duration: "52 min",
    lessonsCount: 7,
    isFeatured: true,
  },
  {
    id: 14,
    slug: "resin-ocean-panel-planning",
    title: "Resin Ocean Panel Planning",
    description:
      "Plan color flow, edges, and glossy layers before pouring a clean ocean-inspired resin panel.",
    categoryId: 6,
    level: "Beginner",
    image: oceanPanelsImage,
    authorId: 6,
    duration: "41 min",
    lessonsCount: 6,
    isFeatured: false,
  },
  {
    id: 15,
    slug: "field-sketchbook-practice",
    title: "Field Sketchbook Practice",
    description:
      "Train your eye with quick outdoor studies focused on shape, proportion, and confident pencil marks.",
    categoryId: 4,
    level: "Beginner",
    image: fieldSketchbookImage,
    authorId: 5,
    duration: "33 min",
    lessonsCount: 5,
    isFeatured: false,
  },
  {
    id: 16,
    slug: "handmade-material-composition",
    title: "Handmade Material Composition",
    description:
      "Arrange simple handmade materials into a cleaner composition before turning them into a finished craft piece.",
    categoryId: 3,
    level: "Beginner",
    image: artisanHandsImage,
    authorId: 4,
    duration: "34 min",
    lessonsCount: 5,
    isFeatured: false,
  },
];

export default tutorials;
