import { Link } from "react-router-dom";
import styles from "./StartSelling.module.css";

const StartSelling = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={styles.title}>
            Turn your passion into income - Start Selling Today!
          </h2>
          <Link className={styles.button} to="/dashboard">
            Upload Your First Artwork
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartSelling;
