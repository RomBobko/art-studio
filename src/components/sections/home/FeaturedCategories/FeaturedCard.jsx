import PropTypes from "prop-types";
import styles from "./FeaturedCard.module.css";

const FeaturedCard = ({ image, alt, title }) => {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.image} src={image} alt={alt} loading="lazy" />
      </div>

      <h3 className={styles.title}>{title}</h3>
    </article>
  );
};

FeaturedCard.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FeaturedCard;
