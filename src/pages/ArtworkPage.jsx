import { useParams } from "react-router-dom";

const ArtworkPage = () => {
  const { artworkSlug } = useParams();

  return <h1>{artworkSlug}</h1>;
};

export default ArtworkPage;
