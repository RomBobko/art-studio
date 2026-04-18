import { HiOutlineArrowRight } from "react-icons/hi2";
import styles from "./PastChallengesSection.module.css";

const PastChallengesSection = ({ challenges }) => {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="past-challenges-title"
    >
      <div className="container-main">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Archive</p>
            <h2 id="past-challenges-title" className={styles.sectionTitle}>
              Past Challenges
            </h2>
            <p className={styles.sectionText}>
              Browse recent prompts and themes from previous Artora challenges.
            </p>
          </div>

          <ul className={styles.list}>
            {challenges.map((challenge) => (
              <li className={styles.item} key={challenge.id}>
                <article className={styles.card}>
                  <div className={styles.thumbnailWrap}>
                    <img
                      className={styles.thumbnail}
                      src={challenge.image}
                      alt={challenge.imageAlt}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.content}>
                    <div className={styles.contentMeta}>
                      <p className={styles.month}>{challenge.month}</p>
                      <p className={styles.winner}>
                        Winner: {challenge.winnerName}
                      </p>
                    </div>
                    <h3 className={styles.title}>{challenge.title}</h3>
                    <p className={styles.theme}>{challenge.theme}</p>
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
