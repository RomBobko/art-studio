import blossomImage from "../assets/images/blossom.webp";
import cityscapeImage from "../assets/images/cityscape.webp";
import sunsetImage from "../assets/images/sunset.webp";

const challengeSubmissions = [
  {
    id: 1,
    challengeId: 1,
    artistId: 1,
    artistName: "Elena Novak",
    artworkTitle: "Morning Window",
    image: blossomImage,
    medium: "Acrylic on canvas",
    submittedAt: "2026-04-12",
    note: "Warm indoor light with soft shadow shapes.",
  },
  {
    id: 2,
    challengeId: 1,
    artistId: 3,
    artistName: "Lucas Bennett",
    artworkTitle: "Quiet Bloom",
    image: sunsetImage,
    medium: "Digital illustration",
    submittedAt: "2026-04-10",
    note: "A calm spring scene built with pale sunrise tones and soft contrast.",
  },
  {
    id: 3,
    challengeId: 1,
    artistId: 5,
    artistName: "Matteo Ricci",
    artworkTitle: "Light on Paper",
    image: cityscapeImage,
    medium: "Graphite sketch",
    submittedAt: "2026-04-08",
    note: "A simple still life focused on contrast, shadow edges, and quiet highlights.",
  },
];

export default challengeSubmissions;
