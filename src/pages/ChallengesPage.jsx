import { Link } from "react-router-dom";
import styles from "./ChallengesPage.module.css";

const ChallengesPage = () => {
  return (
    <section className={styles.section}>
      <div className="container-narrow">
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Challenges</p>
          <h1 className={styles.title}>Coming soon</h1>
          <p className={styles.text}>
            We&apos;re preparing creative challenges where artists can practice,
            share their work, and get inspired by the community. This page is
            still being built — check back soon.
          </p>

          <Link to="/discover" className={styles.link}>
            Explore artworks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChallengesPage;
