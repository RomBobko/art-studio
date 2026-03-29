import { useParams } from "react-router-dom";
import categories from "../data/categories";
import artworks from "../data/artworks";

const CategoryPage = () => {
  const { categorySlug } = useParams();

  const category = categories.find((item) => item.slug === categorySlug);

  if (!category) {
    return <h1>Category not found</h1>;
  }

  const categoryArtworks = artworks.filter((artwork) =>
    artwork.categoryIds.includes(category.id),
  );

  return (
    <>
      <h1>{category.name}</h1>
      <p>Works in this category: {categoryArtworks.length}</p>

      <ul>
        {categoryArtworks.map((artwork) => (
          <li key={artwork.id}>
            <img src={artwork.image} alt={artwork.title} width="200" />
            <h2>{artwork.title}</h2>
            <p>{artwork.type}</p>
            <p>{artwork.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoryPage;
