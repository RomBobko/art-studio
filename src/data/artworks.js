import colorStormImage from "../assets/images/artworks/abstract/color-storm.webp";
import luminousFieldImage from "../assets/images/artworks/abstract/luminous-field.webp";
import tripleRhythmImage from "../assets/images/artworks/abstract/triple-rhythm.webp";
import carnivalPortraitImage from "../assets/images/artworks/abstract-faces/carnival-portrait.webp";
import elongatedFaceImage from "../assets/images/artworks/abstract-faces/elongated-face.webp";
import fracturedGazeImage from "../assets/images/artworks/abstract-faces/fractured-gaze.webp";
import looseLinesImage from "../assets/images/artworks/abstract-faces/loose-lines.webp";
import quietMaskImage from "../assets/images/artworks/abstract-faces/quiet-mask.webp";
import artisanHandsImage from "../assets/images/artworks/crafts/artisan-hands.webp";
import ceramicPlateImage from "../assets/images/artworks/crafts/ceramic-plate.webp";
import clayWorktableImage from "../assets/images/artworks/crafts/clay-worktable.webp";
import crossStitchPatternImage from "../assets/images/artworks/crafts/cross-stitch-pattern.webp";
import goodVibeStonesImage from "../assets/images/artworks/crafts/good-vibe-stones.webp";
import albinoStudyImage from "../assets/images/artworks/digital-art/albino-study.webp";
import chromeDreamImage from "../assets/images/artworks/digital-art/chrome-dream.webp";
import glitchLoveImage from "../assets/images/artworks/digital-art/glitch-love.webp";
import orangeDressImage from "../assets/images/artworks/digital-art/orange-dress.webp";
import signalPortraitImage from "../assets/images/artworks/digital-art/signal-portrait.webp";
import dreamGardenImage from "../assets/images/artworks/illustration/dream-garden.webp";
import elegantProfileImage from "../assets/images/artworks/illustration/elegant-profile.webp";
import fairyPosterImage from "../assets/images/artworks/illustration/fairy-poster.webp";
import lotusInkImage from "../assets/images/artworks/illustration/lotus-ink.webp";
import nordicComfortImage from "../assets/images/artworks/illustration/nordic-comfort.webp";
import softCharacterImage from "../assets/images/artworks/illustration/soft-character.webp";
import alpineLightImage from "../assets/images/artworks/paintings/alpine-light.webp";
import abstractCascadeImage from "../assets/images/artworks/paintings/abstract-cascade.webp";
import cityWalkersImage from "../assets/images/artworks/paintings/city-walkers.webp";
import moonlitWalkImage from "../assets/images/artworks/paintings/moonlit-walk.webp";
import rainyNightImage from "../assets/images/artworks/paintings/rainy-night.webp";
import deepSeaCircleImage from "../assets/images/artworks/resin-art/deep-sea-circle.webp";
import oceanPanelsImage from "../assets/images/artworks/resin-art/ocean-panels.webp";
import resinBarsImage from "../assets/images/artworks/resin-art/resin-bars.webp";
import seaTileImage from "../assets/images/artworks/resin-art/sea-tile.webp";
import workshopPourImage from "../assets/images/artworks/resin-art/workshop-pour.webp";
import fieldSketchbookImage from "../assets/images/artworks/sketch/field-sketchbook.webp";
import koreanGirlStudyImage from "../assets/images/artworks/sketch/korean-girl-study.webp";
import roughPortraitImage from "../assets/images/artworks/sketch/rough-portrait.webp";
import villagePortraitImage from "../assets/images/artworks/sketch/village-portrait.webp";

const makeArtwork = ({
  id,
  slug,
  title,
  artistId,
  categoryId,
  price,
  year,
  medium,
  image,
  description,
  status = "available",
  isTrending = false,
  styleTags = [],
}) => ({
  id,
  slug,
  title,
  artistId,
  categoryId,
  price,
  year,
  medium,
  image,
  description,
  status,
  isTrending,
  styleTags,
});

const artworks = [
  makeArtwork({
    id: 1,
    slug: "abstract-cascade",
    title: "Abstract Cascade",
    artistId: 1,
    categoryId: 1,
    price: 420,
    year: 2025,
    medium: "Acrylic on canvas",
    image: abstractCascadeImage,
    description:
      "A vivid abstract painting with layered color movement, bright contrast, and energetic brushwork.",
    isTrending: true,
    styleTags: ["Abstract", "Expressive Color"],
  }),
  makeArtwork({
    id: 2,
    slug: "city-walkers",
    title: "City Walkers",
    artistId: 1,
    categoryId: 1,
    price: 390,
    year: 2024,
    medium: "Acrylic on canvas",
    image: cityWalkersImage,
    description:
      "A playful city scene with loose figures, soft movement, and a warm gallery-style palette.",
    styleTags: ["Urban", "Figurative"],
  }),
  makeArtwork({
    id: 3,
    slug: "rainy-night",
    title: "Rainy Night",
    artistId: 1,
    categoryId: 1,
    price: 460,
    year: 2025,
    medium: "Impasto acrylic",
    image: rainyNightImage,
    description:
      "A textured rainy street painting with glowing reflections and thick expressive strokes.",
    isTrending: true,
    styleTags: ["Rain", "Impasto"],
  }),
  makeArtwork({
    id: 4,
    slug: "moonlit-walk",
    title: "Moonlit Walk",
    artistId: 1,
    categoryId: 1,
    price: 410,
    year: 2024,
    medium: "Acrylic on canvas",
    image: moonlitWalkImage,
    description:
      "A quiet night painting focused on moonlight, wet pavement, and a solitary figure.",
    styleTags: ["Moonlight", "Atmospheric"],
  }),
  makeArtwork({
    id: 38,
    slug: "alpine-light",
    title: "Alpine Light",
    artistId: 1,
    categoryId: 1,
    price: 345,
    year: 2024,
    medium: "Watercolor painting",
    image: alpineLightImage,
    description:
      "A soft mountain landscape with watercolor washes, pale sky color, and quiet reflective light.",
    styleTags: ["Landscape", "Watercolor"],
  }),
  makeArtwork({
    id: 5,
    slug: "orange-dress",
    title: "Orange Dress",
    artistId: 3,
    categoryId: 2,
    price: 320,
    year: 2025,
    medium: "Digital painting",
    image: orangeDressImage,
    description:
      "A polished digital portrait study with elegant styling, warm color, and painterly texture.",
    isTrending: true,
    styleTags: ["Portrait", "Warm Color"],
  }),
  makeArtwork({
    id: 6,
    slug: "glitch-love",
    title: "Glitch Love",
    artistId: 3,
    categoryId: 2,
    price: 285,
    year: 2024,
    medium: "Glitch digital art",
    image: glitchLoveImage,
    description:
      "A digital portrait built with broken color bands, emotional contrast, and modern glitch effects.",
    styleTags: ["Glitch", "Portrait"],
  }),
  makeArtwork({
    id: 7,
    slug: "chrome-dream",
    title: "Chrome Dream",
    artistId: 3,
    categoryId: 2,
    price: 340,
    year: 2025,
    medium: "Digital artwork",
    image: chromeDreamImage,
    description:
      "A glossy digital composition with futuristic surfaces, soft light, and cinematic contrast.",
    isTrending: true,
    styleTags: ["Futuristic", "Chrome"],
  }),
  makeArtwork({
    id: 8,
    slug: "signal-portrait",
    title: "Signal Portrait",
    artistId: 3,
    categoryId: 2,
    price: 305,
    year: 2024,
    medium: "Digital illustration",
    image: signalPortraitImage,
    description:
      "A detailed digital figure with glitch-style layers, sharp color, and graphic energy.",
    styleTags: ["Digital Figure", "Signal"],
  }),
  makeArtwork({
    id: 9,
    slug: "albino-study",
    title: "Albino Study",
    artistId: 2,
    categoryId: 2,
    price: 315,
    year: 2023,
    medium: "Vector-style digital painting",
    image: albinoStudyImage,
    description:
      "A clean digital portrait study with flat shapes, soft edges, and quiet visual tension.",
    styleTags: ["Vector Style", "Character"],
  }),
  makeArtwork({
    id: 10,
    slug: "good-vibe-stones",
    title: "Good Vibe Stones",
    artistId: 4,
    categoryId: 3,
    price: 145,
    year: 2025,
    medium: "Hand-painted stones",
    image: goodVibeStonesImage,
    description:
      "A set of hand-painted stones with cheerful details, small patterns, and decorative charm.",
    isTrending: true,
    styleTags: ["Handmade", "Decorative"],
  }),
  makeArtwork({
    id: 11,
    slug: "ceramic-plate",
    title: "Ceramic Plate",
    artistId: 4,
    categoryId: 3,
    price: 210,
    year: 2024,
    medium: "Painted ceramic",
    image: ceramicPlateImage,
    description:
      "A bright ceramic plate piece with soft handmade detail and a friendly studio feel.",
    styleTags: ["Ceramic", "Home Decor"],
  }),
  makeArtwork({
    id: 12,
    slug: "clay-worktable",
    title: "Clay Worktable",
    artistId: 4,
    categoryId: 3,
    price: 235,
    year: 2024,
    medium: "Clay craft",
    image: clayWorktableImage,
    description:
      "A craft studio worktable scene focused on material texture, handmade process, and warm light.",
    styleTags: ["Clay", "Studio"],
  }),
  makeArtwork({
    id: 13,
    slug: "artisan-hands",
    title: "Artisan Hands",
    artistId: 4,
    categoryId: 3,
    price: 260,
    year: 2025,
    medium: "Handmade craft",
    image: artisanHandsImage,
    description:
      "A close craft piece showing patient handwork, tactile surfaces, and experienced studio skill.",
    styleTags: ["Artisan", "Texture"],
  }),
  makeArtwork({
    id: 14,
    slug: "cross-stitch-pattern",
    title: "Cross Stitch Pattern",
    artistId: 4,
    categoryId: 3,
    price: 175,
    year: 2023,
    medium: "Textile pattern",
    image: crossStitchPatternImage,
    description:
      "A textile-inspired pattern artwork with small decorative repeats and clean craft structure.",
    styleTags: ["Textile", "Pattern"],
  }),
  makeArtwork({
    id: 15,
    slug: "korean-girl-study",
    title: "Korean Girl Study",
    artistId: 5,
    categoryId: 4,
    price: 220,
    year: 2025,
    medium: "Graphite sketch",
    image: koreanGirlStudyImage,
    description:
      "A portrait sketch with soft facial detail, careful linework, and gentle tonal contrast.",
    isTrending: true,
    styleTags: ["Portrait", "Graphite"],
  }),
  makeArtwork({
    id: 16,
    slug: "fractured-gaze",
    title: "Fractured Gaze",
    artistId: 6,
    categoryId: 5,
    price: 360,
    year: 2025,
    medium: "Acrylic and mixed media",
    image: fracturedGazeImage,
    description:
      "An expressive abstract face with distorted features, rough brush strokes, and layered acrylic texture.",
    isTrending: true,
    styleTags: ["Abstract Faces", "Expressive Figure"],
  }),
  makeArtwork({
    id: 17,
    slug: "village-portrait",
    title: "Village Portrait",
    artistId: 5,
    categoryId: 4,
    price: 235,
    year: 2024,
    medium: "Pencil sketch",
    image: villagePortraitImage,
    description:
      "A narrative sketch study with a quiet figure, village mood, and hand-drawn atmosphere.",
    styleTags: ["Narrative", "Pencil"],
  }),
  makeArtwork({
    id: 18,
    slug: "field-sketchbook",
    title: "Field Sketchbook",
    artistId: 5,
    categoryId: 4,
    price: 185,
    year: 2023,
    medium: "Sketchbook drawing",
    image: fieldSketchbookImage,
    description:
      "A relaxed outdoor sketchbook piece with rough marks, natural setting, and loose study energy.",
    styleTags: ["Sketchbook", "Outdoor Study"],
  }),
  makeArtwork({
    id: 19,
    slug: "rough-portrait",
    title: "Rough Portrait",
    artistId: 5,
    categoryId: 4,
    price: 195,
    year: 2024,
    medium: "Charcoal and pencil",
    image: roughPortraitImage,
    description:
      "A raw portrait drawing with imperfect lines, expressive marks, and direct character study.",
    styleTags: ["Portrait", "Rough Lines"],
  }),
  makeArtwork({
    id: 20,
    slug: "loose-lines",
    title: "Loose Lines",
    artistId: 2,
    categoryId: 5,
    price: 375,
    year: 2024,
    medium: "Acrylic on canvas",
    image: looseLinesImage,
    description:
      "A casual abstract face painting with loose mark making, unfinished edges, and confident brush rhythm.",
    styleTags: ["Loose Brushwork", "Face Study"],
  }),
  makeArtwork({
    id: 21,
    slug: "quiet-mask",
    title: "Quiet Mask",
    artistId: 2,
    categoryId: 5,
    price: 335,
    year: 2023,
    medium: "Acrylic texture study",
    image: quietMaskImage,
    description:
      "A restrained abstract face with off-white texture, subtle features, and a gallery-wall feeling.",
    styleTags: ["Minimal Face", "Texture"],
  }),
  makeArtwork({
    id: 22,
    slug: "elongated-face",
    title: "Elongated Face",
    artistId: 6,
    categoryId: 5,
    price: 390,
    year: 2025,
    medium: "Expressive figurative acrylic",
    image: elongatedFaceImage,
    description:
      "A distorted figurative painting with stretched facial forms, strong mood, and colorful surface movement.",
    styleTags: ["Distorted Face", "Figurative"],
  }),
  makeArtwork({
    id: 23,
    slug: "carnival-portrait",
    title: "Carnival Portrait",
    artistId: 5,
    categoryId: 5,
    price: 355,
    year: 2024,
    medium: "Mixed media portrait",
    image: carnivalPortraitImage,
    description:
      "A playful abstract face with cartoon-like distortion, bold expression, and modern portrait energy.",
    styleTags: ["Modern Portrait", "Bold Expression"],
  }),
  makeArtwork({
    id: 24,
    slug: "ocean-panels",
    title: "Ocean Panels",
    artistId: 6,
    categoryId: 6,
    price: 440,
    year: 2025,
    medium: "Epoxy resin",
    image: oceanPanelsImage,
    description:
      "A resin artwork inspired by ocean tones, translucent layers, and polished wave-like movement.",
    isTrending: true,
    styleTags: ["Ocean", "Epoxy"],
  }),
  makeArtwork({
    id: 25,
    slug: "resin-bars",
    title: "Resin Bars",
    artistId: 6,
    categoryId: 6,
    price: 395,
    year: 2024,
    medium: "Framed resin art",
    image: resinBarsImage,
    description:
      "A modern resin composition with clean bar forms, glossy surfaces, and abstract balance.",
    styleTags: ["Modern", "Gloss Finish"],
  }),
  makeArtwork({
    id: 26,
    slug: "workshop-pour",
    title: "Workshop Pour",
    artistId: 4,
    categoryId: 6,
    price: 365,
    year: 2024,
    medium: "Resin pour",
    image: workshopPourImage,
    description:
      "A process-focused resin piece showing bright workshop energy, liquid material, and careful craft.",
    styleTags: ["Process", "Resin Pour"],
  }),
  makeArtwork({
    id: 27,
    slug: "sea-tile",
    title: "Sea Tile",
    artistId: 6,
    categoryId: 6,
    price: 310,
    year: 2023,
    medium: "Resin tile",
    image: seaTileImage,
    description:
      "A compact resin artwork with sea-inspired detail, playful surface pattern, and glossy finish.",
    styleTags: ["Sea", "Tile"],
  }),
  makeArtwork({
    id: 28,
    slug: "deep-sea-circle",
    title: "Deep Sea Circle",
    artistId: 2,
    categoryId: 6,
    price: 430,
    year: 2025,
    medium: "Circular resin painting",
    image: deepSeaCircleImage,
    description:
      "A circular resin piece with deep sea color, layered depth, and a polished immersive surface.",
    styleTags: ["Deep Sea", "Circular"],
  }),
  makeArtwork({
    id: 29,
    slug: "color-storm",
    title: "Color Storm",
    artistId: 1,
    categoryId: 7,
    price: 375,
    year: 2024,
    medium: "Abstract acrylic",
    image: colorStormImage,
    description:
      "A high-color abstract artwork with energetic motion, layered paint, and bright visual impact.",
    isTrending: true,
    styleTags: ["Color Field", "Movement"],
  }),
  makeArtwork({
    id: 30,
    slug: "luminous-field",
    title: "Luminous Field",
    artistId: 6,
    categoryId: 7,
    price: 410,
    year: 2025,
    medium: "Abstract oil painting",
    image: luminousFieldImage,
    description:
      "A luminous abstract field with soft transitions, thick paint texture, and quiet depth.",
    styleTags: ["Oil Texture", "Light"],
  }),
  makeArtwork({
    id: 31,
    slug: "triple-rhythm",
    title: "Triple Rhythm",
    artistId: 2,
    categoryId: 7,
    price: 385,
    year: 2023,
    medium: "Mixed abstract painting",
    image: tripleRhythmImage,
    description:
      "A rhythmic abstract composition with multiple visual panels, shifting color, and layered form.",
    styleTags: ["Rhythm", "Layered Color"],
  }),
  makeArtwork({
    id: 32,
    slug: "nordic-comfort",
    title: "Nordic Comfort",
    artistId: 3,
    categoryId: 8,
    price: 260,
    year: 2024,
    medium: "Digital illustration",
    image: nordicComfortImage,
    description:
      "A warm Nordic-style illustration with cozy shapes, calm color, and polished editorial mood.",
    styleTags: ["Nordic", "Cozy"],
  }),
  makeArtwork({
    id: 33,
    slug: "lotus-ink",
    title: "Lotus Ink",
    artistId: 5,
    categoryId: 8,
    price: 245,
    year: 2025,
    medium: "Color ink illustration",
    image: lotusInkImage,
    description:
      "A detailed lotus illustration with flowing ink lines, bright color, and botanical structure.",
    styleTags: ["Botanical", "Ink"],
  }),
  makeArtwork({
    id: 34,
    slug: "elegant-profile",
    title: "Elegant Profile",
    artistId: 3,
    categoryId: 8,
    price: 275,
    year: 2024,
    medium: "Flat digital illustration",
    image: elegantProfileImage,
    description:
      "A clean profile illustration with graceful shape design, gentle color, and modern poster polish.",
    styleTags: ["Profile", "Flat Color"],
  }),
  makeArtwork({
    id: 35,
    slug: "dream-garden",
    title: "Dream Garden",
    artistId: 1,
    categoryId: 8,
    price: 290,
    year: 2025,
    medium: "Dreamlike illustration",
    image: dreamGardenImage,
    description:
      "A soft dreamlike illustration with serene atmosphere, layered color, and gentle fantasy detail.",
    styleTags: ["Dreamlike", "Soft Color"],
  }),
  makeArtwork({
    id: 36,
    slug: "soft-character",
    title: "Soft Character",
    artistId: 3,
    categoryId: 8,
    price: 250,
    year: 2023,
    medium: "Character illustration",
    image: softCharacterImage,
    description:
      "A friendly character illustration with soft shapes, clear expression, and polished digital finish.",
    styleTags: ["Character", "Soft Shapes"],
  }),
  makeArtwork({
    id: 37,
    slug: "fairy-poster",
    title: "Fairy Poster",
    artistId: 5,
    categoryId: 8,
    price: 300,
    year: 2024,
    medium: "Poster illustration",
    image: fairyPosterImage,
    description:
      "A fairy-tale poster illustration with bright screen-print feeling, decorative color, and storybook charm.",
    styleTags: ["Poster", "Fairy Tale"],
  }),
];

export default artworks;
