import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import styles from "./FeaturedArtists.module.css";
import FeaturedArtistCard from "./FeaturedArtistCard.jsx";
import artists from "../../../../data/artists";

const FeaturedArtists = () => {
  const visibleArtists = artists.slice(0, 3);
  
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Featured Artists</h2>

        <div className={styles.slider}>
          <button
            className={styles.arrowButton}
            type="button"
            arria-label="Previous artist"
          >
            <HiOutlineChevronLeft className={styles.icon} />
          </button>

          <ul className={styles.list}>
            {visibleArtists.map(({ id, ...restProps }) => (
              <li key={id}>
                <FeaturedArtistCard {...restProps} />
              </li>
            ))}
          </ul>

          <button
            className={styles.arrowButton}
            type="button"
            arria-label=" Next artist"
          >
            <HiOutlineChevronRight className={styles.icon} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
