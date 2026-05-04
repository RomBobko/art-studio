import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { HiOutlineXMark } from "react-icons/hi2";
import * as Yup from "yup";
import styles from "./ChallengeSubmissionForm.module.css";

const INITIAL_FORM_VALUES = {
  artworkTitle: "",
  artistName: "",
  medium: "",
  note: "",
  imageFileName: "",
};

const challengeSubmissionSchema = Yup.object({
  artworkTitle: Yup.string()
    .trim()
    .required("Please enter your artwork title."),
  artistName: Yup.string().trim().required("Please enter your name."),
  medium: Yup.string()
    .trim()
    .required("Please enter the medium used for your artwork."),
});

const ChallengeSubmissionForm = ({
  previewImage,
  onPreviewChange,
  onSubmit,
  onClose,
}) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: challengeSubmissionSchema,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values);
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
    },
  });

  const getFieldError = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    formik.setFieldValue(
      "imageFileName",
      selectedFile ? selectedFile.name : "",
      false,
    );

    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      onPreviewChange("");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onPreviewChange(typeof reader.result === "string" ? reader.result : "");
    };

    reader.readAsDataURL(selectedFile);
  };

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousFocusedElement = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (previousFocusedElement instanceof HTMLElement) {
        previousFocusedElement.focus();
      }
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalShell}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-form-title"
        aria-describedby="challenge-form-description"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <button
            className={styles.closeButton}
            ref={closeButtonRef}
            type="button"
            aria-label="Close submission form"
            onClick={onClose}
          >
            <HiOutlineXMark className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.layout}>
            <div className={styles.storyPanel}>
              <h2 id="challenge-form-title" className={styles.title}>
                Submit Your Artwork
              </h2>
              <p id="challenge-form-description" className={styles.text}>
                Share your response to this month&apos;s brief with a clear
                title, medium, your name, a short note, and an image.
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
                      alt={
                        formik.values.artworkTitle ||
                        formik.values.imageFileName ||
                        "Selected artwork preview"
                      }
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

            <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
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
                    value={formik.values.artworkTitle}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    aria-invalid={Boolean(getFieldError("artworkTitle"))}
                    aria-describedby={
                      getFieldError("artworkTitle")
                        ? "artwork-title-error"
                        : undefined
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
                    value={formik.values.artistName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    aria-invalid={Boolean(getFieldError("artistName"))}
                    aria-describedby={
                      getFieldError("artistName") ? "artist-name-error" : undefined
                    }
                  />
                  {getFieldError("artistName") && (
                    <p
                      className={styles.errorText}
                      id="artist-name-error"
                      role="alert"
                    >
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
                  value={formik.values.medium}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  aria-invalid={Boolean(getFieldError("medium"))}
                  aria-describedby={
                    getFieldError("medium") ? "artwork-medium-error" : undefined
                  }
                />
                {getFieldError("medium") && (
                  <p
                    className={styles.errorText}
                    id="artwork-medium-error"
                    role="alert"
                  >
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
                  value={formik.values.note}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Upload artwork</span>
                <label className={styles.uploadArea} htmlFor="artwork-file">
                  <span className={styles.uploadTitle}>
                    Select an image for your submission
                  </span>
                  <span className={styles.uploadText}>
                    {formik.values.imageFileName
                      ? `Selected file: ${formik.values.imageFileName}`
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
      </div>
    </div>
  );
};

export default ChallengeSubmissionForm;
