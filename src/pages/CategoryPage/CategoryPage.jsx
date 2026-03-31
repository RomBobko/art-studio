import { Link, useParams } from "react-router-dom";
import styles from "./CategoryPage.module.css";
import categories from "../../data/categories";
// import artworks from "../data/artworks";
import artworks from "../../data/artworks-Temporary";

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
          <aside className={styles.sidebar} aria-labelledby="filters-title">
            <h2 id="filters-title" className={styles.sidebarTitle}>
              Filters
            </h2>

            <form className={styles.filtersForm}>
              <fieldset className={styles.filterGroup}>
                <legend className={styles.filterLegend}>Mediums</legend>

                <label className={styles.filterOption}>
                  <input type="checkbox" name="medium" value="oil" />
                  <span>Oil</span>
                </label>

                <label className={styles.filterOption}>
                  <input type="checkbox" name="medium" value="acrylic" />
                  <span>Acrylic</span>
                </label>
              </fieldset>

              <fieldset className={styles.filterGroup}>
                <legend className={styles.filterLegend}>Style</legend>

                <label className={styles.filterOption}>
                  <input type="checkbox" name="style" value="abstract" />
                  <span>Abstract</span>
                </label>

                <label className={styles.filterOption}>
                  <input type="checkbox" name="style" value="realism" />
                  <span>Realism</span>
                </label>
              </fieldset>
            </form>
          </aside>

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
                <li key={artwork.id}>
                  <article className={styles.card}>
                    <Link
                      to={`/artworks/${artwork.slug}`}
                      className={styles.cardLink}
                    >
                      <img
                        className={styles.cardImage}
                        src={artwork.image}
                        alt={artwork.title}
                      />
                      <div className={styles.cardBody}>
                        <h3 className={styles.cardTitle}>{artwork.title}</h3>
                        <p className={styles.cardMeta}>{artwork.type}</p>
                        <p className={styles.cardPrice}>${artwork.price}</p>
                      </div>
                    </Link>
                  </article>
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
