import styles from "./BrowseCaregories.module.css";
import categories from "../../data/BrowseCategories";
import { Link } from "react-router-dom";

const BrowseCaregories = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.heading}>
          <span className={styles.line}></span>
          <h2 className={styles.title}>Browse Categories</h2>
          <span className={styles.line}></span>
        </div>

        <ul className={styles.list}>
          {categories.map(({ title, slug, image }) => (
            <li className={styles.item} key={slug}>
              <Link className={styles.card} to={``}>
                <img className={styles.image} src={image} alt="title" />
                <span className={styles.label}>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BrowseCaregories;
