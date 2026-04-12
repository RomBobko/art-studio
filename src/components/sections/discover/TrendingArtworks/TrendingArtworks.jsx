import styles from "./TrendingArtworks.module.css";
import ArtworkCard from "./ArtworkCard";
import artworks from "../../../../data/artworks";
import { toArtworkCardProps } from "../../../../data/artworkPreview";

const TrendingArtworks = () => {
  const trendingArtworks = artworks
    .filter((artwork) => artwork.isTrending)
    .slice(0, 8);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Trending Artworks</h2>

        <ul className={styles.list}>
          {trendingArtworks.map((artwork) => (
            <li className={styles.item} key={artwork.id}>
              <ArtworkCard {...toArtworkCardProps(artwork)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingArtworks;
