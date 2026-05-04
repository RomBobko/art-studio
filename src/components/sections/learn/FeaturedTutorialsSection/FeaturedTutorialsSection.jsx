import PropTypes from "prop-types";
import { useState } from "react";
import TutorialCard from "../TutorialCard/TutorialCard";
import styles from "./FeaturedTutorialsSection.module.css";

const VIEW_MORE_STEP = 3;
const INITIAL_VISIBLE_COUNT = 3;

const FeaturedTutorialsSection = ({
  tutorials,
  initialVisibleCount = INITIAL_VISIBLE_COUNT,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const visibleTutorials = tutorials.slice(0, visibleCount);
  const hasMoreTutorials = visibleCount < tutorials.length;

  const handleViewMore = () => {
    setVisibleCount((currentVisibleCount) =>
      Math.min(currentVisibleCount + VIEW_MORE_STEP, tutorials.length),
    );
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="featured-tutorials-title"
    >
      <div className="container">
        <div className={styles.header}>
          <h2 id="featured-tutorials-title" className={styles.title}>
            Featured Tutorials
          </h2>
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

const featuredTutorialShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  lessonsCount: PropTypes.number.isRequired,
});

FeaturedTutorialsSection.propTypes = {
  tutorials: PropTypes.arrayOf(featuredTutorialShape).isRequired,
  initialVisibleCount: PropTypes.number,
};

export default FeaturedTutorialsSection;
