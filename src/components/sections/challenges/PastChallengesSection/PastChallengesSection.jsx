import { HiOutlineArrowRight } from "react-icons/hi2";
import artists from "../../../../data/artists";
import styles from "./PastChallengesSection.module.css";

const parseDateString = (value) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const formatChallengeMonth = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(parseDateString(value));

const PastChallengesSection = ({ challenges }) => {
  const artistNamesById = Object.fromEntries(
    artists.map((artist) => [artist.id, artist.name]),
  );

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="past-challenges-title"
    >
      <div className="container-main">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 id="past-challenges-title" className={styles.sectionTitle}>
              Past Challenges
            </h2>
            <p className={styles.sectionText}>
              Browse recent prompts and themes from previous ArtStudio challenges.
            </p>
          </div>

          <ul className={styles.list}>
            {challenges.map((challenge) => (
              <li className={styles.item} key={challenge.id}>
                <article className={styles.card}>
                  <div className={styles.thumbnailWrap}>
                    <img
                      className={styles.thumbnail}
                      src={challenge.coverImage}
                      alt={`${challenge.title} challenge cover`}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.content}>
                    <div className={styles.contentMeta}>
                      <p className={styles.month}>
                        {formatChallengeMonth(challenge.deadline)}
                      </p>
                      <p className={styles.winner}>
                        Winner:{" "}
                        {artistNamesById[challenge.winnerArtistId] ||
                          "To be announced"}
                      </p>
                    </div>
                    <h3 className={styles.title}>{challenge.title}</h3>
                    <p className={styles.theme}>{challenge.theme}</p>
                    {challenge.winningArtworkTitle && (
                      <p className={styles.winner}>
                        Winning artwork: {challenge.winningArtworkTitle}
                      </p>
                    )}
                  </div>

                  <span className={styles.indicator} aria-hidden="true">
                    <HiOutlineArrowRight className={styles.icon} />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PastChallengesSection;
