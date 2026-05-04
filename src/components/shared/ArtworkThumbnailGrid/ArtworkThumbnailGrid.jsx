import styles from "./ArtworkThumbnailGrid.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const artworkThumbnailShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

const ArtworkThumbnailGrid = ({
  title,
  titleId,
  artworks,
  headerAction = null,
  footerAction = null,
  emptyMessage = "No artworks found.",
}) => {
  const headerClassName = headerAction ? styles.headerWithAction : styles.header;

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className="container">
        <div className={headerClassName}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>

          {headerAction}
        </div>

        {artworks.length > 0 ? (
          <ul className={styles.grid}>
            {artworks.map((artwork) => (
              <li key={artwork.id} className={styles.item}>
                <Link to={`/artworks/${artwork.slug}`} className={styles.link}>
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className={styles.image}
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>{emptyMessage}</p>
        )}

        {footerAction}
      </div>
    </section>
  );
};

ArtworkThumbnailGrid.propTypes = {
  title: PropTypes.node.isRequired,
  titleId: PropTypes.string.isRequired,
  artworks: PropTypes.arrayOf(artworkThumbnailShape).isRequired,
  headerAction: PropTypes.node,
  footerAction: PropTypes.node,
  emptyMessage: PropTypes.string,
};

export default ArtworkThumbnailGrid;
