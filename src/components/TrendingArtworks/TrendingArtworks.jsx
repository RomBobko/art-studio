import styles from "./TrendingArtworks.module.css";
// import trendingArtworks from "../../data/TrendingArtworks";
import ArtworkCard from "./ArtworkCard";
import artworks from "../../data/artworks";

const TrendingArtworks = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Trending Artworks</h2>

        <ul className={styles.list}>
          {artworks.map(({ id, ...restProps }) => (
            <li className={styles.item} key={id}>
              <ArtworkCard {...restProps}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrendingArtworks;
