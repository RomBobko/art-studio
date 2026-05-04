import PropTypes from "prop-types";
import styles from "./LearnHero.module.css";

const LearnHero = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <section className={styles.section}>
      <div className="container-wide">
        <div className={styles.inner}>
          <h1 className={styles.title}>Learn &amp; Create</h1>

          <p className={styles.text}>
            Build your artistic skills with simple, practical tutorials. Start
            with beginner-friendly lessons, explore different styles, and learn
            at a steady pace.
          </p>

          <ul className={styles.categories} aria-label="Tutorial categories">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className={
                    category === selectedCategory
                      ? `${styles.categoryChip} ${styles.categoryChipActive}`
                      : styles.categoryChip
                  }
                  onClick={() => onSelectCategory(category)}
                  aria-pressed={category === selectedCategory}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

LearnHero.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default LearnHero;
