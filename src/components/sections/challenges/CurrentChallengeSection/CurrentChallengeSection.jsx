import styles from "./CurrentChallengeSection.module.css";

const CurrentChallengeSection = ({
  title,
  theme,
  description,
  deadline,
  format,
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
        <div className={styles.shell}>
          <div className={styles.card}>
            <div className={styles.content}>
              <div className={styles.topRow}>
                <p className={styles.eyebrow}>ArtStudio Challenges</p>
                <p className={styles.status}>Open for submissions</p>
              </div>

              <div className={styles.headingGroup}>
                <h1 id="current-challenge-title" className={styles.title}>
                  {title}
                </h1>
                <p className={styles.theme}>{theme}</p>
              </div>

              <p className={styles.description}>{description}</p>

              <div className={styles.actions}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={onParticipate}
                >
                  Participate
                </button>
                <p className={styles.actionNote}>
                  Share your piece before {deadline} to join this round.
                </p>
              </div>

              <div className={styles.metaGrid}>
                <article className={styles.metaCard}>
                  <p className={styles.metaLabel}>Deadline</p>
                  <p className={styles.metaValue}>{deadline}</p>
                </article>

                <article className={styles.metaCard}>
                  <p className={styles.metaLabel}>Format</p>
                  <p className={styles.metaValue}>{format}</p>
                </article>

                <article className={styles.metaCard}>
                  <p className={styles.metaLabel}>Prize</p>
                  <p className={styles.metaValue}>{prize}</p>
                </article>
              </div>
            </div>

            <div className={styles.visual}>
              <div className={styles.visualFrame}>
                <div className={styles.imageWrap}>
                  <img className={styles.image} src={image} alt={imageAlt} />
                </div>
              </div>

              <div className={styles.overlayCard}>
                <p className={styles.overlayLabel}>Creative brief</p>
                <p className={styles.overlayText}>
                  Focus on softness, atmosphere, and the first light of spring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentChallengeSection;
