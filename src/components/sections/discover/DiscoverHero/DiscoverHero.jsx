import { BsSearch } from "react-icons/bs";
import styles from "./DiscoverHero.module.css";

const DiscoverHero = () => {
  return (
    <section className={styles.section}>
      <div className="container-wide">
        <div className={styles.inner}>
          <h1 className={styles.title}>Explore & Discover</h1>
          <p className={styles.text}>
            Find art that matches your mood and sparks your imagination. Explore
            unique creations from talented artists worldwide, curated to inspire
            your every moment.
          </p>

          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.visuallyHidden}>Search artworks</span>
              <input
                className={styles.input}
                type="search"
                placeholder="Search artworks.."
              />
            </label>

            <button className={styles.button} type="submit" aria-label="search">
              <BsSearch className={styles.icon} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DiscoverHero;
