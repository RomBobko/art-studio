import styles from "./CurrentChallengeSection.module.css";

const parseDateString = (value) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const formatDisplayDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parseDateString(value));

const getStatusLabel = (status) => {
  switch (status) {
    case "active":
      return "Open for submissions";
    case "closed":
      return "Challenge closed";
    default:
      return "Status coming soon";
  }
};

const CurrentChallengeSection = ({
  title,
  theme,
  brief,
  deadline,
  status,
  allowedMedia,
  prize,
  coverImage,
  onParticipate,
}) => {
  const formattedDeadline = formatDisplayDate(deadline);

  return (
    <section
      className={`section-lg ${styles.section}`}
      aria-labelledby="current-challenge-title"
    >
      <div className="container-main">
        <div className={styles.shell}>
          <div className={styles.card}>
            <div className={styles.content}>
              <div className={styles.headingGroup}>
                <h1 id="current-challenge-title" className={styles.title}>
                  {title}
                </h1>
                <p className={styles.theme}>{theme}</p>
              </div>

              <p className={styles.description}>{brief}</p>

              <div className={styles.actions}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={onParticipate}
                >
                  Participate
                </button>
                <p className={styles.actionNote}>
                  Share your piece before {formattedDeadline} to join this round.
                </p>
              </div>

              <div className={styles.metaGrid}>
                <article className={styles.metaCard}>
                  <p className={styles.metaLabel}>Deadline</p>
                  <p className={styles.metaValue}>{formattedDeadline}</p>
                </article>

                <article className={styles.metaCard}>
                  <p className={styles.metaLabel}>Allowed media</p>
                  <p className={styles.metaValue}>{allowedMedia}</p>
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
                  <img
                    className={styles.image}
                    src={coverImage}
                    alt={`${title} challenge cover`}
                  />
                </div>
              </div>

              <div className={styles.overlayCard}>
                <p className={styles.overlayLabel}>Challenge status</p>
                <p className={styles.overlayText}>{getStatusLabel(status)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentChallengeSection;
