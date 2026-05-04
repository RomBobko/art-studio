import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsImage } from "react-icons/bs";
import styles from "../DashboardPage.module.css";

const INITIAL_UPLOAD_VALUES = {
  artworkTitle: "",
  artworkMedium: "",
  artworkPrice: "",
  artworkFileName: "",
};

const uploadValidationSchema = Yup.object({
  artworkTitle: Yup.string()
    .trim()
    .required("Please enter an artwork title."),
  artworkMedium: Yup.string()
    .trim()
    .required("Please enter the artwork medium."),
  artworkPrice: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Please enter a price greater than 0.")
    .required("Please enter the artwork price.")
    .positive("Please enter a price greater than 0."),
  artworkFileName: Yup.string().required(
    "Please choose an image for your artwork.",
  ),
});

const DashboardUploadForm = ({
  listedArtworksCount,
  draftArtworksCount,
  onDraftCreate,
}) => {
  const artworkFileInputRef = useRef(null);
  const [uploadPreview, setUploadPreview] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");

  const uploadFormik = useFormik({
    initialValues: INITIAL_UPLOAD_VALUES,
    validationSchema: uploadValidationSchema,
    onSubmit: (values, formikHelpers) => {
      const trimmedTitle = values.artworkTitle.trim();
      const trimmedMedium = values.artworkMedium.trim();
      const draftPrice = Number(values.artworkPrice);

      const newDraftArtwork = {
        id: `draft-${Date.now()}`,
        title: trimmedTitle,
        medium: trimmedMedium,
        price: draftPrice,
        image: uploadPreview,
      };

      onDraftCreate(newDraftArtwork);
      setUploadPreview("");
      setUploadSuccessMessage(`${trimmedTitle} was added as a local draft.`);
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);

      if (artworkFileInputRef.current) {
        artworkFileInputRef.current.value = "";
      }
    },
  });

  const getUploadFieldError = (fieldName) =>
    uploadFormik.touched[fieldName] && uploadFormik.errors[fieldName];

  const handleUploadChange = (event) => {
    setUploadSuccessMessage("");
    uploadFormik.handleChange(event);
  };

  const handleArtworkImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setUploadSuccessMessage("");
    uploadFormik.setFieldTouched("artworkFileName", true, false);

    if (!selectedFile) {
      uploadFormik.setFieldValue("artworkFileName", "", true);
      setUploadPreview("");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      uploadFormik.setFieldValue("artworkFileName", "", false);
      uploadFormik.setFieldError(
        "artworkFileName",
        "Please choose a valid image file.",
      );
      setUploadPreview("");
      if (artworkFileInputRef.current) {
        artworkFileInputRef.current.value = "";
      }
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadPreview(reader.result);
        uploadFormik.setFieldValue("artworkFileName", selectedFile.name, true);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleUploadSubmit = (event) => {
    setUploadSuccessMessage("");
    uploadFormik.handleSubmit(event);
  };

  return (
    <section className={styles.uploadBlock}>
      <h2 className={styles.blockTitle}>Upload Art</h2>
      <p className={styles.sectionText}>
        You currently have {listedArtworksCount} artwork
        {listedArtworksCount === 1 ? "" : "s"} listed on your public profile
        and {draftArtworksCount} local draft
        {draftArtworksCount === 1 ? "" : "s"} pending review.
      </p>

      <form className={styles.uploadForm} onSubmit={handleUploadSubmit} noValidate>
        <label className={styles.uploadPreview} htmlFor="dashboard-art-image">
          {uploadPreview ? (
            <img
              className={styles.uploadPreviewImage}
              src={uploadPreview}
              alt={
                uploadFormik.values.artworkTitle ||
                uploadFormik.values.artworkFileName ||
                "Selected artwork preview"
              }
            />
          ) : (
            <div className={styles.uploadPreviewPlaceholder}>
              <BsImage className={styles.uploadIcon} />
              <span className={styles.uploadPreviewText}>
                Choose an artwork image
              </span>
            </div>
          )}
        </label>

        <input
          className={styles.fileInput}
          id="dashboard-art-image"
          ref={artworkFileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleArtworkImageChange}
        />

        <p className={styles.fileName}>
          {uploadFormik.values.artworkFileName
            ? `Selected file: ${uploadFormik.values.artworkFileName}`
            : "PNG, JPG, or WEBP"}
        </p>

        {getUploadFieldError("artworkFileName") && (
          <p className={styles.errorText} role="alert">
            {getUploadFieldError("artworkFileName")}
          </p>
        )}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="dashboard-art-title">
            Title
          </label>
          <input
            className={`${styles.input} ${
              getUploadFieldError("artworkTitle") ? styles.inputError : ""
            }`}
            id="dashboard-art-title"
            name="artworkTitle"
            type="text"
            placeholder="Artwork title"
            value={uploadFormik.values.artworkTitle}
            onBlur={uploadFormik.handleBlur}
            onChange={handleUploadChange}
          />
          {getUploadFieldError("artworkTitle") && (
            <p className={styles.errorText} role="alert">
              {getUploadFieldError("artworkTitle")}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="dashboard-art-medium">
            Medium
          </label>
          <input
            className={`${styles.input} ${
              getUploadFieldError("artworkMedium") ? styles.inputError : ""
            }`}
            id="dashboard-art-medium"
            name="artworkMedium"
            type="text"
            placeholder="Example: Acrylic on canvas"
            value={uploadFormik.values.artworkMedium}
            onBlur={uploadFormik.handleBlur}
            onChange={handleUploadChange}
          />
          {getUploadFieldError("artworkMedium") && (
            <p className={styles.errorText} role="alert">
              {getUploadFieldError("artworkMedium")}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="dashboard-art-price">
            Price
          </label>
          <input
            className={`${styles.input} ${
              getUploadFieldError("artworkPrice") ? styles.inputError : ""
            }`}
            id="dashboard-art-price"
            name="artworkPrice"
            type="number"
            min="1"
            step="1"
            placeholder="Price in USD"
            value={uploadFormik.values.artworkPrice}
            onBlur={uploadFormik.handleBlur}
            onChange={handleUploadChange}
          />
          {getUploadFieldError("artworkPrice") && (
            <p className={styles.errorText} role="alert">
              {getUploadFieldError("artworkPrice")}
            </p>
          )}
        </div>

        <button className={styles.primaryButton} type="submit">
          Upload
        </button>

        {uploadSuccessMessage && (
          <p className={styles.successText}>{uploadSuccessMessage}</p>
        )}
      </form>
    </section>
  );
};

DashboardUploadForm.propTypes = {
  listedArtworksCount: PropTypes.number.isRequired,
  draftArtworksCount: PropTypes.number.isRequired,
  onDraftCreate: PropTypes.func.isRequired,
};

export default DashboardUploadForm;
