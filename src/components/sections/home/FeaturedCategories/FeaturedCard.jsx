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

export default FeaturedCard;
