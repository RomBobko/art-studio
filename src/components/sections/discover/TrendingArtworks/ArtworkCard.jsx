import styles from "./ArtworkCard.module.css";
import { Link } from "react-router-dom";

const ArtworkCard = ({ title, slug, price, type, artistName, image }) => {
  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} to={`/artworks/${slug}`}>
        <img className={styles.image} src={image} alt={title} />
      </Link>
      
      <div className={styles.content}>
        <div className={styles.top}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.price}>${price}</span>
        </div>

        <p className={styles.type}>{type}</p>
        <p className={styles.author}>{artistName}</p>
      </div>
    </article>
  );
};

export default ArtworkCard;
