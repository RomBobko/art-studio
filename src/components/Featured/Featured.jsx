import styles from "./Featured.module.css";
import featuredCategories from "../../data/featuredCategories.js";
import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  return (
    <section className={styles.featured}>
      <div className="container">
        <div className={styles.heading}>
          <span className={styles.line}></span>
          <h2 className={styles.title}>Featured Categories</h2>
          <span className={styles.line}></span>
        </div>

        <ul className={styles.list}>
          {featuredCategories.map(({ id, image, alt, title }) => (
            <li key={id} className={styles.item}>
              <FeaturedCard image={image} alt={alt} title={title} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Featured;