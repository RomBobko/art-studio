import { useParams } from "react-router-dom";

const ArtistPage = () => {
  const { artistSlug } = useParams();
  
  return <h1>artistSlug</h1>;
};

export default ArtistPage;
