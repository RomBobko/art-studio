import { Link } from "react-router-dom";
import styles from "./CuratedArtworkCard.module.css";

const CuratedArtworkCard = ({ slug, image, title, artistName, artistSlug }) => {
  return (
    <article className={styles.card}>
      <Link className={styles.mediaLink} to={`/artworks/${slug}`}>
        <div className={styles.media}>
          <img className={styles.image} src={image} alt={title} loading="lazy" />
        </div>
      </Link>

      <Link className={styles.titleLink} to={`/artworks/${slug}`}>
        <h3 className={styles.title}>{title}</h3>
      </Link>

      <Link className={styles.authorLink} to={`/artists/${artistSlug}`}>
        <p className={styles.name}>{artistName}</p>
      </Link>
    </article>
  );
};

export default CuratedArtworkCard;
