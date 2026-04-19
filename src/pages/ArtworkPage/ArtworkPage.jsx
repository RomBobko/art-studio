import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ArtworkPage.module.css";
import artworks from "../../data/artworks";
import artists from "../../data/artists";
import ArtworkThumbnailGrid from "../../components/shared/ArtworkThumbnailGrid";
import { useCart } from "../../context/CartContext";

const getArtworkDetails = (item) => {
  const artist = artists.find((entry) => entry.id === item.artistId);
  const medium = item.medium || "Medium available on request";

  return {
    ...item,
    artist,
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
  const { cartItems, addToCart } = useCart();

  const artworkSource = artworks.find((item) => item.slug === artworkSlug);

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
  const relatedArtworks = artworks
    .filter(
      (item) =>
        item.id !== artwork.id &&
        item.categoryIds.some((id) => artwork.categoryIds.includes(id)),
    )
    .map((item) => getArtworkDetails(item))
    .slice(0, 4);
  const formattedPrice = new Intl.NumberFormat("en-US").format(artwork.price);

  const handleAddToCart = () => {
    const cartArtwork = {
      id: artwork.id,
      title: artwork.title,
      artistName: artwork.artist?.name || "Unknown artist",
      medium: artwork.medium,
      price: artwork.price,
      image: artwork.image,
    };
    const itemExistsInCart = cartItems.some(
      (item) => item.id === String(cartArtwork.id),
    );

    addToCart(cartArtwork);

    toast.success(
      itemExistsInCart
        ? `Updated quantity for ${artwork.title}.`
        : `${artwork.title} added to cart.`,
    );
  };

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

              <button
                className={styles.button}
                type="button"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <ArtworkThumbnailGrid
        titleId="related-artworks-title"
        title="Related Artworks"
        artworks={relatedArtworks}
        headerAction={
          <Link to="/discover" className={styles.relatedArtworksLink}>
            View All
          </Link>
        }
      />
    </div>
  );
};

export default ArtworkPage;
