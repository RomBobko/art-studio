import { Link, useParams } from "react-router-dom";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import styles from "./ArtistPage.module.css";
import artists from "../../data/artists";
import temporaryArtworks from "../../data/artworks-Temporary";

const ArtistPage = () => {
  const { artistSlug } = useParams();

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

  const artistArtworks = temporaryArtworks.filter(
    (item) => item.artistId === artist.id,
  );

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
                <button className={styles.button} type="button">
                  Follow
                </button>

                <ul className={styles.socials}>
                  <li className={styles.socialsItem}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={styles.socialsLink}
                      aria-label="Twitter"
                    >
                      <FaTwitter className={styles.socialIcon} />
                    </a>
                  </li>

                  <li className={styles.socialsItem}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={styles.socialsLink}
                      aria-label="Instagram"
                    >
                      <FaInstagram className={styles.socialIcon} />
                    </a>
                  </li>

                  <li className={styles.socialsItem}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={styles.socialsLink}
                      aria-label="Website"
                    >
                      <RiGlobalLine className={styles.socialIcon} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="artist-artworks-title"
      >
        <div className="container">
          <h2 id="artist-artworks-title" className={styles.artistArtworksTitle}>
            Artworks by{" "}
            <span className={styles.artistTitleName}>{artist.name}</span>
          </h2>

          {artistArtworks.length > 0 ? (
            <ul className={styles.artistArtworksGrid}>
              {artistArtworks.map((item) => (
                <li key={item.id} className={styles.artistArtworksItem}>
                  <Link
                    to={`/artworks/${item.slug}`}
                    className={styles.artistArtworkLink}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.artistArtworkImage}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.artistArtworksEmpty}>No artworks found.</p>
          )}

          <div className={styles.artistArtworksActions}>
            <Link to="/discover" className={styles.artistArtworksLink}>
              View More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistPage;