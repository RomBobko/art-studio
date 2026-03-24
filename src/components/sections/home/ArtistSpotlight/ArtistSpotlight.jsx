import { Link } from "react-router-dom";
import styles from "./ArtistSpotlight.module.css";
import Artist from "../../../../assets/images/artists/elena-novak.webp";

const ArtistSpotlight = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={Artist} alt="name" />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Artist Spotlight</h2>
          <h3 className={styles.name}>Elena Novak</h3>
          <p className={styles.description}>
            Elena is a contemporary digital and mixed-media artist whose work
            blends tradition with modern expression. She explores themes of
            nature, emotions, and everyday life through bold colors and delicate
            details.
          </p>
          <Link className={styles.link}>View Profile</Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistSpotlight;
