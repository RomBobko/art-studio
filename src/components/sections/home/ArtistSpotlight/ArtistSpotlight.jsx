import { Link } from "react-router-dom";
import styles from "./ArtistSpotlight.module.css";
import artists from "../../../../data/artists";

const ArtistSpotlight = () => {
  const spotlightArtist =
    artists.find((artist) => artist.slug === "elena-novak") || artists[0];

  if (!spotlightArtist) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={spotlightArtist.avatar}
              alt={spotlightArtist.name}
            />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>Artist Spotlight</h2>
            <h3 className={styles.name}>{spotlightArtist.name}</h3>
            <p className={styles.description}>{spotlightArtist.bio}</p>
            <Link
              to={`/artists/${spotlightArtist.slug}`}
              className={styles.link}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSpotlight;
