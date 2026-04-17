import styles from "./TrendingArtworks.module.css";
import ArtworkCard from "./ArtworkCard";
import { toArtworkCardProps } from "../../../../data/artworkPreview";

const TrendingArtworks = ({ artworks, hasActiveSearch }) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Trending Artworks</h2>

        {artworks.length > 0 ? (
          <ul className={styles.list}>
            {artworks.map((artwork) => (
              <li className={styles.item} key={artwork.id}>
                <ArtworkCard {...toArtworkCardProps(artwork)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            {hasActiveSearch
              ? "No artworks match your search."
              : "No artworks are available right now."}
          </p>
        )}
      </div>
    </section>
  );
};

export default TrendingArtworks;
