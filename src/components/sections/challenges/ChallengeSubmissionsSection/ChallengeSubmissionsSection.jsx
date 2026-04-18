import styles from "./ChallengeSubmissionsSection.module.css";

const ChallengeSubmissionsSection = ({ submissions }) => {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="challenge-submissions-title"
    >
      <div className="container-main">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2
              id="challenge-submissions-title"
              className={styles.sectionTitle}
            >
              Submissions
            </h2>
            <p className={styles.sectionText}>
              See the latest pieces shared by artists taking part in this
              challenge.
            </p>
          </div>

          <div className={styles.grid}>
            {submissions.map((submission) => (
              <article className={styles.card} key={submission.id}>
                <div className={styles.imageWrap}>
                  <img
                    className={styles.image}
                    src={submission.image}
                    alt={submission.imageAlt}
                    loading="lazy"
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.artworkTitle}>
                    {submission.artworkTitle}
                  </h3>
                  <p className={styles.artistName}>{submission.artistName}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSubmissionsSection;
