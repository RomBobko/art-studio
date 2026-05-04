import PropTypes from "prop-types";
import styles from "./ArtworkCard.module.css";
import { Link } from "react-router-dom";

const ArtworkCard = ({ title, slug, price, medium, artistName, image }) => {
  return (
    <article className={styles.card}>
      <Link
        className={styles.imageLink}
        to={`/artworks/${slug}`}
        aria-label={`View ${title}`}
      >
        <img className={styles.image} src={image} alt={title} />
      </Link>

      <div className={styles.content}>
        <div className={styles.top}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.price}>${price}</span>
        </div>

        <p className={styles.medium}>{medium}</p>
        <p className={styles.author}>{artistName}</p>
      </div>
    </article>
  );
};

ArtworkCard.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  medium: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ArtworkCard;
