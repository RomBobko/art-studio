import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <section className={styles.section} aria-labelledby="not-found-title">
      <div className="container-narrow">
        <div className={styles.card}>
          <p className={styles.kicker}>404</p>
          <h1 id="not-found-title" className={styles.title}>
            Page not found
          </h1>
          <p className={styles.text}>
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryLink} to="/">
              Back to Home
            </Link>
            <Link className={styles.secondaryLink} to="/discover">
              Explore Art
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
