import PropTypes from "prop-types";
import styles from "../ChallengeSubmissionForm.module.css";

const ChallengeSubmissionFields = ({
  values,
  getFieldError,
  handleBlur,
  handleChange,
  handleFileChange,
  handleSubmit,
  onClose,
}) => (
  <form className={styles.form} onSubmit={handleSubmit} noValidate>
    <div className={styles.grid}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="artwork-title">
          Artwork title
        </label>
        <input
          className={`${styles.input} ${
            getFieldError("artworkTitle") ? styles.inputError : ""
          }`}
          id="artwork-title"
          name="artworkTitle"
          type="text"
          placeholder="Enter your artwork title"
          value={values.artworkTitle}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={Boolean(getFieldError("artworkTitle"))}
          aria-describedby={
            getFieldError("artworkTitle") ? "artwork-title-error" : undefined
          }
        />
        {getFieldError("artworkTitle") && (
          <p
            className={styles.errorText}
            id="artwork-title-error"
            role="alert"
          >
            {getFieldError("artworkTitle")}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="artist-name">
          Artist name
        </label>
        <input
          className={`${styles.input} ${
            getFieldError("artistName") ? styles.inputError : ""
          }`}
          id="artist-name"
          name="artistName"
          type="text"
          placeholder="Enter your name"
          value={values.artistName}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={Boolean(getFieldError("artistName"))}
          aria-describedby={
            getFieldError("artistName") ? "artist-name-error" : undefined
          }
        />
        {getFieldError("artistName") && (
          <p className={styles.errorText} id="artist-name-error" role="alert">
            {getFieldError("artistName")}
          </p>
        )}
      </div>
    </div>

    <div className={styles.field}>
      <label className={styles.label} htmlFor="artwork-medium">
        Medium
      </label>
      <input
        className={`${styles.input} ${
          getFieldError("medium") ? styles.inputError : ""
        }`}
        id="artwork-medium"
        name="medium"
        type="text"
        placeholder="Example: Acrylic on canvas"
        value={values.medium}
        onBlur={handleBlur}
        onChange={handleChange}
        aria-invalid={Boolean(getFieldError("medium"))}
        aria-describedby={
          getFieldError("medium") ? "artwork-medium-error" : undefined
        }
      />
      {getFieldError("medium") && (
        <p className={styles.errorText} id="artwork-medium-error" role="alert">
          {getFieldError("medium")}
        </p>
      )}
    </div>

    <div className={styles.field}>
      <label className={styles.label} htmlFor="artwork-note">
        Short description
      </label>
      <textarea
        className={styles.textarea}
        id="artwork-note"
        name="note"
        placeholder="Tell a little about your artwork"
        rows="5"
        value={values.note}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>

    <div className={styles.field}>
      <span className={styles.label}>Upload artwork</span>
      <label className={styles.uploadArea} htmlFor="artwork-file">
        <span className={styles.uploadTitle}>
          Select an image for your submission
        </span>
        <span className={styles.uploadText}>
          {values.imageFileName
            ? `Selected file: ${values.imageFileName}`
            : "PNG, JPG, or WEBP works well here."}
        </span>
        <input
          className={styles.fileInput}
          id="artwork-file"
          name="artworkFile"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
        />
      </label>
    </div>

    <div className={styles.actions}>
      <button className={styles.cancelButton} type="button" onClick={onClose}>
        Cancel
      </button>
      <button className={styles.submitButton} type="submit">
        Submit Artwork
      </button>
    </div>
  </form>
);

ChallengeSubmissionFields.propTypes = {
  values: PropTypes.shape({
    artworkTitle: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    imageFileName: PropTypes.string.isRequired,
  }).isRequired,
  getFieldError: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChallengeSubmissionFields;
