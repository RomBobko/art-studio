import PropTypes from "prop-types";
import styles from "../ChallengeSubmissionForm.module.css";

const ChallengeSubmissionPreview = ({
  previewImage,
  artworkTitle,
  imageFileName,
}) => (
  <div className={styles.storyPanel}>
    <h2 id="challenge-form-title" className={styles.title}>
      Submit Your Artwork
    </h2>
    <p id="challenge-form-description" className={styles.text}>
      Share your response to this month&apos;s brief with a clear title,
      medium, your name, a short note, and an image.
    </p>

    <div className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <p className={styles.previewLabel}>Preview</p>
        <p className={styles.previewHint}>
          This is how your artwork appears in the submissions gallery.
        </p>
      </div>

      {previewImage ? (
        <div className={styles.previewWrap}>
          <img
            className={styles.previewImage}
            src={previewImage}
            alt={artworkTitle || imageFileName || "Selected artwork preview"}
          />
        </div>
      ) : (
        <div className={styles.previewEmpty}>
          <p className={styles.previewEmptyTitle}>
            Your artwork preview will appear here
          </p>
          <p className={styles.previewEmptyText}>
            Add an image to see the card update before you submit.
          </p>
        </div>
      )}
    </div>
  </div>
);

ChallengeSubmissionPreview.propTypes = {
  previewImage: PropTypes.string.isRequired,
  artworkTitle: PropTypes.string.isRequired,
  imageFileName: PropTypes.string.isRequired,
};

export default ChallengeSubmissionPreview;
