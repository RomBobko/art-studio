import TutorialCard from "../TutorialCard/TutorialCard";
import styles from "./TutorialsSection.module.css";

const TutorialsSection = ({ tutorials }) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Tutorials</h2>
          <p className={styles.text}>
            Start with approachable lessons that build confidence step by step.
          </p>
        </div>

        {tutorials.length > 0 ? (
          <ul className={styles.list}>
            {tutorials.map((tutorial) => (
              <li className={styles.item} key={tutorial.id}>
                <TutorialCard {...tutorial} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            No standard tutorials match this category yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default TutorialsSection;
