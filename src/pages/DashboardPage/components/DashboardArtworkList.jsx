import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../DashboardPage.module.css";

const DashboardArtworkList = ({ draftArtworks, recentArtworks, formatPrice }) => {
  return (
    <section className={styles.topSellingBlock}>
      <h2 className={styles.blockTitle}>Your Artworks</h2>
      <p className={styles.sectionText}>
        Recent published artworks and local upload drafts.
      </p>

      <ul className={styles.topSellingList}>
        {draftArtworks.map((artwork) => (
          <li
            key={artwork.id}
            className={`${styles.topSellingItem} ${styles.draftItem}`}
          >
            <img
              className={styles.topSellingImage}
              src={artwork.image}
              alt={artwork.title}
            />
            <div className={styles.topSellingContent}>
              <p className={styles.draftTitle}>{artwork.title}</p>
              <span className={styles.topSellingMeta}>
                {artwork.medium} | Local draft
              </span>
              <span className={styles.draftBadge}>Pending review</span>
            </div>
            <span className={styles.topSellingPrice}>
              {formatPrice(artwork.price)}
            </span>
          </li>
        ))}

        {recentArtworks.map((artwork) => (
          <li key={artwork.id} className={styles.topSellingItem}>
            <img
              className={styles.topSellingImage}
              src={artwork.image}
              alt={artwork.title}
            />
            <div className={styles.topSellingContent}>
              <Link
                to={`/artworks/${artwork.slug}`}
                className={styles.topSellingLink}
              >
                {artwork.title}
              </Link>
              <span className={styles.topSellingMeta}>
                {artwork.medium} | {artwork.year}
              </span>
            </div>
            <span className={styles.topSellingPrice}>
              {formatPrice(artwork.price)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const dashboardArtworkShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  slug: PropTypes.string,
  year: PropTypes.number,
});

DashboardArtworkList.propTypes = {
  draftArtworks: PropTypes.arrayOf(dashboardArtworkShape).isRequired,
  recentArtworks: PropTypes.arrayOf(dashboardArtworkShape).isRequired,
  formatPrice: PropTypes.func.isRequired,
};

export default DashboardArtworkList;
