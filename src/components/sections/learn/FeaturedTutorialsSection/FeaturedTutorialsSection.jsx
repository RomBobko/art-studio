import { useEffect, useState } from "react";
import TutorialCard from "../TutorialCard/TutorialCard";
import styles from "./FeaturedTutorialsSection.module.css";

const VIEW_MORE_STEP = 3;

const FeaturedTutorialsSection = ({
  tutorials,
  initialVisibleCount = tutorials.length,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const visibleTutorials = tutorials.slice(0, visibleCount);
  const hasMoreTutorials = visibleCount < tutorials.length;

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [initialVisibleCount, tutorials.length]);

  const handleViewMore = () => {
    setVisibleCount((currentVisibleCount) =>
      Math.min(currentVisibleCount + VIEW_MORE_STEP, tutorials.length),
    );
  };

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
          <>
            <ul className={styles.list}>
              {visibleTutorials.map((tutorial) => (
                <li className={styles.item} key={tutorial.id}>
                  <TutorialCard {...tutorial} />
                </li>
              ))}
            </ul>

            {hasMoreTutorials && (
              <div className={styles.actions}>
                <button
                  className={styles.viewMoreButton}
                  type="button"
                  onClick={handleViewMore}
                >
                  View more
                </button>
              </div>
            )}
          </>
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
