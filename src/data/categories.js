import paintingsImg from "../assets/images/category-covers/paintings.webp";
import digitalArtImg from "../assets/images/category-covers/digital-art.webp";
import craftsImg from "../assets/images/category-covers/crafts.webp";
import sketchImg from "../assets/images/category-covers/sketch.webp";
import resinArtImg from "../assets/images/category-covers/resin-art.webp";
import abstractImg from "../assets/images/category-covers/abstract.webp";
import illustrationImg from "../assets/images/category-covers/illustration.webp";
import abstractFacesImg from "../assets/images/category-covers/abstract-faces.webp";

const categories = [
  {
    id: 1,
    slug: "paintings",
    name: "Paintings",
    image: paintingsImg,
  },
  {
    id: 2,
    slug: "digital-art",
    name: "Digital Art",
    image: digitalArtImg,
  },
  {
    id: 3,
    slug: "crafts",
    name: "Crafts",
    image: craftsImg,
  },
  {
    id: 4,
    slug: "sketch",
    name: "Sketch",
    image: sketchImg,
  },
  {
    id: 5,
    slug: "abstract-faces",
    name: "Abstract Faces",
    image: abstractFacesImg,
  },
  {
    id: 6,
    slug: "resin-art",
    name: "Resin Art",
    image: resinArtImg,
  },
  {
    id: 7,
    slug: "abstract",
    name: "Abstract",
    image: abstractImg,
  },
  {
    id: 8,
    slug: "illustration",
    name: "Illustration",
    image: illustrationImg,
  },
];

export default categories;
