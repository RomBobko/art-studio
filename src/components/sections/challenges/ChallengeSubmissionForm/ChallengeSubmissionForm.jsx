import styles from "./ChallengeSubmissionForm.module.css";

const ChallengeSubmissionForm = ({
  values,
  errors,
  previewImage,
  onChange,
  onFileChange,
  onSubmit,
  onClose,
}) => {
  return (
    <section
      className={`section-sm ${styles.section}`}
      aria-labelledby="challenge-form-title"
    >
      <div className="container-main">
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 id="challenge-form-title" className={styles.title}>
              Submit Your Artwork
            </h2>
            <p className={styles.text}>
              Share your artwork with the community by adding a title, your
              name, a short note, and an image.
            </p>
          </div>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="artwork-title">
                  Artwork title
                </label>
                <input
                  className={`${styles.input} ${
                    errors.artworkTitle ? styles.inputError : ""
                  }`}
                  id="artwork-title"
                  name="artworkTitle"
                  type="text"
                  placeholder="Enter your artwork title"
                  value={values.artworkTitle}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.artworkTitle)}
                  aria-describedby={
                    errors.artworkTitle ? "artwork-title-error" : undefined
                  }
                />
                {errors.artworkTitle && (
                  <p
                    className={styles.errorText}
                    id="artwork-title-error"
                    role="alert"
                  >
                    {errors.artworkTitle}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="artist-name">
                  Artist name
                </label>
                <input
                  className={`${styles.input} ${
                    errors.artistName ? styles.inputError : ""
                  }`}
                  id="artist-name"
                  name="artistName"
                  type="text"
                  placeholder="Enter your name"
                  value={values.artistName}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.artistName)}
                  aria-describedby={
                    errors.artistName ? "artist-name-error" : undefined
                  }
                />
                {errors.artistName && (
                  <p
                    className={styles.errorText}
                    id="artist-name-error"
                    role="alert"
                  >
                    {errors.artistName}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="artwork-note">
                Short description
              </label>
              <textarea
                className={styles.textarea}
                id="artwork-note"
                name="artworkNote"
                placeholder="Tell a little about your artwork"
                rows="5"
                value={values.artworkNote}
                onChange={onChange}
              />
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Upload artwork</span>
              <label className={styles.uploadArea} htmlFor="artwork-file">
                <span className={styles.uploadTitle}>
                  Choose an image file to upload
                </span>
                <span className={styles.uploadText}>
                  {values.artworkFileName
                    ? `Selected file: ${values.artworkFileName}`
                    : "PNG, JPG, or WEBP works well here."}
                </span>
                <input
                  className={styles.fileInput}
                  id="artwork-file"
                  name="artworkFile"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={onFileChange}
                />
              </label>
              {previewImage && (
                <div className={styles.previewWrap}>
                  <img
                    className={styles.previewImage}
                    src={previewImage}
                    alt={
                      values.artworkTitle ||
                      values.artworkFileName ||
                      "Selected artwork preview"
                    }
                  />
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className={styles.submitButton} type="submit">
                Submit Artwork
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSubmissionForm;
