import styles from "./CuratedArtworks.module.css";
import curatedArtworks from "../../../../data/CuratedArtworks.js";
import CuratedArtworkCard from "./CuratedArtworkCard.jsx";

const CuratedArtworks = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Curated Artworks</h2>

        <ul className={styles.list}>
          {curatedArtworks.map(
            ({ id, slug, title, image, artistName, artistSlug }) => (
              <li className={styles.item} key={id}>
                <CuratedArtworkCard
                  slug={slug}
                  image={image}
                  title={title}
                  artistName={artistName}
                  artistSlug={artistSlug}
                />
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default CuratedArtworks;
