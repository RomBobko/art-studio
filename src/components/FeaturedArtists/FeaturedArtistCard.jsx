import { Link } from "react-router-dom";
import styles from "./FeaturedArtistCard.module.css";

const FeaturedArtistCard = ({ avatar, name, slug }) => {
  return (
    <article className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img className={styles.avatar} src={avatar} alt={name} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>

        <Link className={styles.link} to={`/artists/${slug}`}>
          View Profile
        </Link>
      </div>
    </article>
  );
};

export default FeaturedArtistCard;