import learnSkill from "../assets/images/learnSkill.png";
import joinChallenge from "../assets/images/joinChallenge.png";
import shopArtworks from "../assets/images/shopArtworks.png";
import meetArtists from "../assets/images/meetArtists.png";

const featuredCategories = [
  {
    id: "learn",
    title: "Learn a skill",
    image: learnSkill,
    alt: "Person learning a new skill",
    to: "/learn",
    linkLabel: "Learn a skill",
  },
  {
    id: "challenge",
    title: "Join a Challenge",
    image: joinChallenge,
    alt: "Artist joining a challenge",
    to: "/challenges",
    linkLabel: "Join a Challenge",
  },
  {
    id: "shop",
    title: "Shop Artworks",
    image: shopArtworks,
    alt: "Framed artwork",
    to: "/discover",
    linkLabel: "Shop Artworks",
  },
  {
    id: "artists",
    title: "Meet Artists",
    image: meetArtists,
    alt: "Artist portrait illustration",
    to: "/discover",
    linkLabel: "Meet Artists on Discover",
  },
];

export default featuredCategories;
