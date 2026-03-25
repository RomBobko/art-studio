import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categorySlug } = useParams();

  return <h1>{categorySlug}</h1>;
};

export default CategoryPage;
