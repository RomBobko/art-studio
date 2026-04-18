import styles from "./CurrentChallengeSection.module.css";

const CurrentChallengeSection = ({
  title,
  description,
  deadline,
  prize,
  image,
  imageAlt,
  onParticipate,
}) => {
  return (
    <section
      className={`section-lg ${styles.section}`}
      aria-labelledby="current-challenge-title"
    >
      <div className="container-main">
        <div className={styles.card}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Current Challenge</p>

            <h1 id="current-challenge-title" className={styles.title}>
              {title}
            </h1>

            <p className={styles.description}>{description}</p>

            <div className={styles.metaGrid}>
              <article className={styles.metaCard}>
                <p className={styles.metaLabel}>Deadline</p>
                <p className={styles.metaValue}>{deadline}</p>
              </article>

              <article className={styles.metaCard}>
                <p className={styles.metaLabel}>Prize</p>
                <p className={styles.metaValue}>{prize}</p>
              </article>
            </div>

            <button
              className={styles.button}
              type="button"
              onClick={onParticipate}
            >
              Participate
            </button>
          </div>

          <div className={styles.imageWrap}>
            <img className={styles.image} src={image} alt={imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentChallengeSection;
