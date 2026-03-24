import styles from "./CuratedArtworkCard.module.css";

const CuratedArtworkCard = ({ image, title, author }) => {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.image} src={image} alt={title} loading="lazy" />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.name}>{author}</p>
    </article>
  );
};

export default CuratedArtworkCard;
