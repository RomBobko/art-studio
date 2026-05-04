import PropTypes from "prop-types";
import { BsPlayFill } from "react-icons/bs";
import styles from "./TutorialCard.module.css";

const TutorialCard = ({
  title,
  description,
  category,
  level,
  image,
  authorName,
  authorAvatar,
  duration,
  lessonsCount,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.image} src={image} alt={title} loading="lazy" />
        <span className={styles.playBadge} aria-hidden="true">
          <BsPlayFill className={styles.playIcon} />
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.badges}>
          <span className={styles.badge}>{category}</span>
          <span className={styles.badgeMuted}>{level}</span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.details}>
          <span>{duration}</span>
          <span>{lessonsCount} lessons</span>
        </div>

        <div className={styles.author}>
          <img
            className={styles.authorAvatar}
            src={authorAvatar}
            alt={authorName}
            loading="lazy"
          />
          <span className={styles.authorName}>{authorName}</span>
        </div>
      </div>
    </article>
  );
};

TutorialCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  lessonsCount: PropTypes.number.isRequired,
};

export default TutorialCard;
