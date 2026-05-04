import PropTypes from "prop-types";
import styles from "./ChallengeSubmissionsSection.module.css";

const parseDateString = (value) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const formatSubmittedDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parseDateString(value));

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
                    alt={`${submission.artworkTitle} by ${submission.artistName}`}
                    loading="lazy"
                  />
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <p className={styles.medium}>{submission.medium}</p>
                    <p className={styles.submittedAt}>
                      {formatSubmittedDate(submission.submittedAt)}
                    </p>
                  </div>
                  <h3 className={styles.artworkTitle}>
                    {submission.artworkTitle}
                  </h3>
                  <p className={styles.artistName}>{submission.artistName}</p>
                  {submission.note && (
                    <p className={styles.note}>{submission.note}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const challengeSubmissionShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string.isRequired,
  artworkTitle: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  submittedAt: PropTypes.string.isRequired,
  note: PropTypes.string,
});

ChallengeSubmissionsSection.propTypes = {
  submissions: PropTypes.arrayOf(challengeSubmissionShape).isRequired,
};

export default ChallengeSubmissionsSection;
