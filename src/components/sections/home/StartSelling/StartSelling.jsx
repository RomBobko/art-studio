import styles from "./StartSelling.module.css";

const StartSelling = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={styles.title}>
            Turn your passion into income - Start Selling Today!
          </h2>
          <button className={styles.button} type="button">
            Upload Your First Artwork
          </button>
        </div>
      </div>
    </section>
  );
};

export default StartSelling;
