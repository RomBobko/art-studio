import styles from "./ArtworkThumbnailGrid.module.css";
import { Link } from "react-router-dom";

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

export default ArtworkThumbnailGrid;
