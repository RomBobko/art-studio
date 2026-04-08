import { Link, useParams } from "react-router-dom";
import styles from "./ArtworkPage.module.css";
import artworks from "../../data/artworks";
import temporaryArtworks from "../../data/artworks-Temporary";
import artists from "../../data/artists";
import ArtworkCard from "../../components/sections/discover/TrendingArtworks/ArtworkCard";

const getArtworkReference = (artworkId) =>
  artworks.find((item) => item.id === artworkId) ??
  artworks[(artworkId - 1) % artworks.length];

const getArtworkDetails = (item) => {
  const artist = artists.find((entry) => entry.id === item.artistId);
  const imageReference = getArtworkReference(item.id);
  const medium =
    item.medium ||
    (item.type !== "Temporary Artwork" ? item.type : imageReference?.type) ||
    "Medium available on request";

  return {
    ...item,
    artist,
    image: imageReference?.image || item.image,
    medium,
    size: item.size || "Dimensions available on request",
    description:
      item.description ||
      `${item.title} is a ${medium.toLowerCase()} piece by ${
        artist?.name || "the artist"
      }, created in ${item.year}.`,
  };
};

const ArtworkPage = () => {
  const { artworkSlug } = useParams();

  const temporaryArtwork = temporaryArtworks.find(
    (item) => item.slug === artworkSlug,
  );
  const libraryArtwork = artworks.find((item) => item.slug === artworkSlug);
  const artworkSource = temporaryArtwork || libraryArtwork;

  if (!artworkSource) {
    return (
      <section className={styles.notFound}>
        <div className="container">
          <h1 className={styles.notFoundTitle}>Artwork not found</h1>
          <Link to="/discover" className={styles.backLink}>
            Back to Discover
          </Link>
        </div>
      </section>
    );
  }

  const artwork = getArtworkDetails(artworkSource);
  const artworkCollection = temporaryArtwork ? temporaryArtworks : artworks;
  const relatedArtworks = artworkCollection
    .filter(
      (item) =>
        item.id !== artwork.id &&
        item.categoryIds.some((id) => artwork.categoryIds.includes(id)),
    )
    .map((item) => getArtworkDetails(item))
    .slice(0, 4);
  const formattedPrice = new Intl.NumberFormat("en-US").format(artwork.price);

  return (
    <div className={styles.page}>
      <section className={styles.artworkSection}>
        <div className="container">
          <div className={styles.layout}>
            <figure className={styles.media}>
              <img
                className={styles.image}
                src={artwork.image}
                alt={artwork.title}
              />
            </figure>

            <div className={styles.content}>
              <h1 className={styles.title}>{artwork.title}</h1>

              {artwork.artist && (
                <Link
                  to={`/artists/${artwork.artist.slug}`}
                  className={styles.artistLink}
                >
                  {artwork.artist.name}
                </Link>
              )}

              <div className={styles.meta}>
                <p className={styles.metaMedium}>{artwork.medium}</p>
                <p className={styles.metaText}>{artwork.size}</p>
                <p className={styles.metaText}>{artwork.year}</p>
              </div>

              <p className={styles.description}>{artwork.description}</p>

              <p className={styles.price}>${formattedPrice}</p>

              <button className={styles.button} type="button">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.relatedArtworks}
        aria-labelledby="related-artworks-title"
      >
        <div className="container">
          <div className={styles.relatedArtworksHeader}>
            <h2
              id="related-artworks-title"
              className={styles.relatedArtworksTitle}
            >
              Related Artworks
            </h2>

            <Link to="/discover" className={styles.relatedArtworksLink}>
              View All
            </Link>
          </div>

          {relatedArtworks.length > 0 ? (
            <ul className={styles.relatedArtworksGrid}>
              {relatedArtworks.map((item) => (
                <li key={item.id} className={styles.relatedArtworksItem}>
                  <Link
                    to={`/artworks/${item.slug}`}
                    className={styles.relatedArtworkLink}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.relatedArtworkImage}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.relatedArtworksEmpty}>
              No related artworks found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtworkPage;
