import styles from "./ArtworkCard.module.css";

const ArtworkCard = ({ image, alt, title, name }) => {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.image} src={image} alt={alt} loading="lazy" />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.name}>{name}</p>
    </article>
  );
};

export default ArtworkCard;
