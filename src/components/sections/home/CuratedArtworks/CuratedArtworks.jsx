import styles from "./CuratedArtworks.module.css";
import curatedArtworks from "../../../../data/CuratedArtworks.js";
import CuratedArtworkCard from "./CuratedArtworkCard.jsx";

const CuratedArtworks = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Curated Artworks</h2>

        <ul className={styles.list}>
          {curatedArtworks.map(({ title, image, author }) => (
            <li key={title}>
              <CuratedArtworkCard image={image} title={title} author={author} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CuratedArtworks;
