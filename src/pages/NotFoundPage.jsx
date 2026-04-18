import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <div className="container-narrow">
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.text}>
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>

          <Link to="/" className={styles.link}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
