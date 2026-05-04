import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { HiOutlineXMark } from "react-icons/hi2";
import * as Yup from "yup";
import styles from "./ChallengeSubmissionForm.module.css";
import ChallengeSubmissionFields from "./components/ChallengeSubmissionFields";
import ChallengeSubmissionPreview from "./components/ChallengeSubmissionPreview";

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
            <ChallengeSubmissionPreview
              previewImage={previewImage}
              artworkTitle={formik.values.artworkTitle}
              imageFileName={formik.values.imageFileName}
            />

            <ChallengeSubmissionFields
              values={formik.values}
              getFieldError={getFieldError}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              handleFileChange={handleFileChange}
              handleSubmit={formik.handleSubmit}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ChallengeSubmissionForm.propTypes = {
  previewImage: PropTypes.string.isRequired,
  onPreviewChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChallengeSubmissionForm;
