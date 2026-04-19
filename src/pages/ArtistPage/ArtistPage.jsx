import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ArtistPage.module.css";
import artists from "../../data/artists";
import artworks from "../../data/artworks";
import ArtworkThumbnailGrid from "../../components/shared/ArtworkThumbnailGrid";

const ArtistPage = () => {
  const { artistSlug } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const artist = artists.find((item) => item.slug === artistSlug);

  if (!artist) {
    return (
      <section className={styles.notFound}>
        <div className="container">
          <h1 className={styles.notFoundTitle}>Artist not found</h1>
          <Link to="/discover" className={styles.backLink}>
            Back to Discover
          </Link>
        </div>
      </section>
    );
  }

  const artistArtworks = artworks.filter((item) => item.artistId === artist.id);

  const artistArtworksActionsClassName =
    artistArtworks.length > 0
      ? `${styles.artistArtworksActions} ${styles.artistArtworksActionsWithGrid}`
      : styles.artistArtworksActions;

  const followButtonClassName = isFollowing
    ? `${styles.button} ${styles.buttonFollowing}`
    : styles.button;

  const handleFollowToggle = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };

  return (
    <>
      <section className={styles.artistSection}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.media}>
              <img
                className={styles.avatar}
                src={artist.avatar}
                alt={artist.name}
              />
            </div>

            <div className={styles.content}>
              <h1 className={styles.title}>{artist.name}</h1>
              <p className={styles.description}>
                {artist.description ||
                  artist.bio ||
                  "Artist description coming soon."}
              </p>

              <div className={styles.actions}>
                <button
                  className={followButtonClassName}
                  type="button"
                  onClick={handleFollowToggle}
                  aria-pressed={isFollowing}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtworkThumbnailGrid
        titleId="artist-artworks-title"
        title={
          <>
            Artworks by{" "}
            <span className={styles.artistTitleName}>{artist.name}</span>
          </>
        }
        artworks={artistArtworks}
        footerAction={
          <div className={artistArtworksActionsClassName}>
            <Link to="/discover" className={styles.artistArtworksLink}>
              View More
            </Link>
          </div>
        }
      />
    </>
  );
};

export default ArtistPage;
