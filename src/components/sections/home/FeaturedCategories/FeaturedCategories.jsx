import styles from "./Featured.module.css";
import featuredCategories from "../../../../data/FeaturedCategories";
import FeaturedCard from "./FeaturedCard";

const FeaturedCategories = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <span className={styles.line}></span>
          <h2 className={styles.title}>Featured Categories</h2>
          <span className={styles.line}></span>
        </div>

        <ul className={styles.list}>
          {featuredCategories.map(
            ({ id, image, alt, title, to, linkLabel }) => (
              <li className={styles.item} key={id}>
                <FeaturedCard
                  image={image}
                  alt={alt}
                  title={title}
                  to={to}
                  linkLabel={linkLabel}
                />
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedCategories;
