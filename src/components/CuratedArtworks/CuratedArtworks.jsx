import styles from "./CuratedArtworks.module.css";

const CuratedArtworks = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Curated Artworks</h2>

        <ul className={styles.list}>
          <li>
            <article className={styles.artworkCard}>
                
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CuratedArtworks;
