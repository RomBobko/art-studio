import TutorialCard from "../TutorialCard/TutorialCard";
import styles from "./FeaturedTutorialsSection.module.css";

const FeaturedTutorialsSection = ({ tutorials }) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Tutorials</h2>
          <p className={styles.text}>
            Highlighted lessons that can stay separate from the main tutorial
            grid.
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
            No featured tutorials match this category yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedTutorialsSection;
