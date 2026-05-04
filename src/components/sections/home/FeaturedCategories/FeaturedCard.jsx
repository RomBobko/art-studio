import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./FeaturedCard.module.css";

const FeaturedCard = ({ image, alt, title, to, linkLabel }) => {
  return (
    <Link className={styles.card} to={to} aria-label={linkLabel}>
      <div className={styles.media}>
        <img className={styles.image} src={image} alt={alt} loading="lazy" />
      </div>

      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};

FeaturedCard.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
};

export default FeaturedCard;
