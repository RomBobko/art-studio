import styles from "./ArtworkCard.module.css";
import { Link } from "react-router-dom";

const ArtworkCard = ({ title, price, type, author, image }) => {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={image} alt={title} />

      <div className={styles.content}>
        <div className={styles.top}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.price}>${price}</span>
        </div>

        <p className={styles.type}>{type}</p>
        <p className={styles.author}>{author}</p>
      </div>
    </article>
  );
};

export default ArtworkCard;
