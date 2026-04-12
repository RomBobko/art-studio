import { useParams } from "react-router-dom";
import styles from "./CategoryPage.module.css";
import categories from "../../data/categories";
import artworks from "../../data/artworks";
import ArtworkCard from "../../components/sections/discover/TrendingArtworks/ArtworkCard";
import { toArtworkCardProps } from "../../data/artworkPreview";
import CategoryFilter from "./CategoryFilter";

const filterGroups = [
  {
    name: "medium",
    label: "Mediums",
    options: [
      { value: "oil", label: "Oil" },
      { value: "acrylic", label: "Acrylic" },
    ],
  },
  {
    name: "style",
    label: "Style",
    options: [
      { value: "abstract", label: "Abstract" },
      { value: "realism", label: "Realism" },
    ],
  },
];

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
      <section
        className={styles.hero}
        aria-labelledby="category-title"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15)), url(${category.image})`,
        }}
      >
        <div className={`container ${styles.overlay}`}>
          <h1 id="category-title" className={styles.title}>
            {category.name}
          </h1>
        </div>
      </section>

      <section className={styles.catalog} aria-labelledby="artworks-heading">
        <div className={`container ${styles.catalogLayout}`}>
          <CategoryFilter groups={filterGroups} />

          <div className={styles.content}>
            <div className={styles.toolbar}>
              <p className={styles.resultsCount}>
                Showing {categoryArtworks.length} artworks
              </p>

              <div className={styles.sortBox}>
                <label htmlFor="sort">Sort by</label>
                <select id="sort" name="sort">
                  <option>Newest</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>

            <ul className={styles.grid}>
              {categoryArtworks.map((artwork) => (
                <li className={styles.artworkItem} key={artwork.id}>
                  <ArtworkCard {...toArtworkCardProps(artwork)} />
                </li>
              ))}
            </ul>

            <button type="button" className={styles.loadMore}>
              Load More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
