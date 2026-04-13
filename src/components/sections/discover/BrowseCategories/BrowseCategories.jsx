import { Link } from "react-router-dom";
import categories from "../../../../data/categories";
import styles from "./BrowseCategories.module.css";

const BrowseCategories = () => {
  return (
    <section className={styles.section}>
      <div className="container-narrow">
        <div className={styles.inner}>
          <div className={styles.heading}>
            <span className={styles.line}></span>
            <h2 className={styles.title}>Browse Categories</h2>
            <span className={styles.line}></span>
          </div>

          <ul className={styles.list}>
            {categories.map(({ id, name, slug, image }) => (
              <li className={styles.item} key={id}>
                <Link to={`/discover/${slug}`} className={styles.card}>
                  <img className={styles.image} src={image} alt={name} />
                  <span className={styles.label}>{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
