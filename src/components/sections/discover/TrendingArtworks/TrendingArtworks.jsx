import PropTypes from "prop-types";
import styles from "./TrendingArtworks.module.css";
import ArtworkCard from "./ArtworkCard";
import { toArtworkCardProps } from "../../../../data/artworkPreview";

const TrendingArtworks = ({
  artworks,
  hasActiveSearch,
  title = "Trending Artworks",
}) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>{title}</h2>

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

const trendingArtworkShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  medium: PropTypes.string.isRequired,
  artistId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

TrendingArtworks.propTypes = {
  artworks: PropTypes.arrayOf(trendingArtworkShape).isRequired,
  hasActiveSearch: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default TrendingArtworks;
