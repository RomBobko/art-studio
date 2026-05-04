import { useRef, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { BsImage } from "react-icons/bs";
import styles from "./DashboardPage.module.css";
import currentUser from "../../data/currentUser";
import artists from "../../data/artists";
import artworks from "../../data/artworks";

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

const profileValidationSchema = Yup.object({
  profileBio: Yup.string().trim().required("Please enter a short bio."),
  profileWebsite: Yup.string()
    .trim()
    .test(
      "valid-website",
      "Please enter a valid website.",
      (value) => !value || (!value.includes(" ") && value.includes(".")),
    ),
  profileInstagram: Yup.string(),
});

const formatPrice = (value) => `$${new Intl.NumberFormat("en-US").format(value)}`;

const DashboardPage = () => {
  const dashboardArtist = artists.find(
    (artist) => artist.id === currentUser.artistId,
  );
  const dashboardArtworks = artworks.filter(
    (artwork) => artwork.artistId === currentUser.artistId,
  );
  const dashboardArtistName = dashboardArtist?.name || currentUser.displayName;
  const artworkFileInputRef = useRef(null);
  const [uploadPreview, setUploadPreview] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [draftArtworks, setDraftArtworks] = useState([]);
  const [profileSuccessMessage, setProfileSuccessMessage] = useState("");
  const recentArtworks = [...dashboardArtworks]
    .sort(
      (firstArtwork, secondArtwork) =>
        secondArtwork.year - firstArtwork.year ||
        secondArtwork.price - firstArtwork.price,
    )
    .slice(0, 3);
  const listedArtworksCount = dashboardArtworks.length;
  const draftArtworksCount = draftArtworks.length;
  const trendingArtworksCount = dashboardArtworks.filter(
    (artwork) => artwork.isTrending,
  ).length;
  const totalPortfolioValue = dashboardArtworks.reduce(
    (sum, artwork) => sum + artwork.price,
    0,
  );

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

      setDraftArtworks((prevDraftArtworks) => [
        newDraftArtwork,
        ...prevDraftArtworks,
      ]);
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

  const profileFormik = useFormik({
    initialValues: {
      profileBio: currentUser.bio || dashboardArtist?.bio || "",
      profileWebsite: currentUser.website || "",
      profileInstagram: currentUser.socialLinks?.instagram || "",
    },
    validationSchema: profileValidationSchema,
    onSubmit: (values, formikHelpers) => {
      setProfileSuccessMessage("Profile updated locally.");
      formikHelpers.setSubmitting(false);
    },
  });

  const getProfileFieldError = (fieldName) =>
    profileFormik.touched[fieldName] && profileFormik.errors[fieldName];

  const handleProfileChange = (event) => {
    setProfileSuccessMessage("");
    profileFormik.handleChange(event);
  };

  const handleProfileSubmit = (event) => {
    setProfileSuccessMessage("");
    profileFormik.handleSubmit(event);
  };

  return (
    <div className={styles.page}>
      <section
        className={styles.dashboardSection}
        aria-labelledby="dashboard-page-title"
      >
        <div className="container-narrow">
          <div className={styles.header}>
            <h1 id="dashboard-page-title" className={styles.title}>
              Artist Dashboard
            </h1>
            <p className={styles.description}>
              Manage the artworks currently shown on {dashboardArtistName}
              &apos;s public profile, preview local upload drafts, and keep your
              artist details in one place.
            </p>
          </div>

          <div className={styles.dashboardCard}>
            <div className={styles.layout}>
              <section className={styles.uploadBlock}>
                <h2 className={styles.blockTitle}>Upload Art</h2>
                <p className={styles.sectionText}>
                  You currently have {listedArtworksCount} artwork
                  {listedArtworksCount === 1 ? "" : "s"} listed on your public
                  profile and {draftArtworksCount} local draft
                  {draftArtworksCount === 1 ? "" : "s"} pending review.
                </p>

                <form
                  className={styles.uploadForm}
                  onSubmit={handleUploadSubmit}
                  noValidate
                >
                  <label
                    className={styles.uploadPreview}
                    htmlFor="dashboard-art-image"
                  >
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
                        getUploadFieldError("artworkTitle")
                          ? styles.inputError
                          : ""
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
                    <label
                      className={styles.label}
                      htmlFor="dashboard-art-medium"
                    >
                      Medium
                    </label>
                    <input
                      className={`${styles.input} ${
                        getUploadFieldError("artworkMedium")
                          ? styles.inputError
                          : ""
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
                        getUploadFieldError("artworkPrice")
                          ? styles.inputError
                          : ""
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

              <div className={styles.insightsColumn}>
                <section className={styles.analyticsBlock}>
                  <h2 className={styles.blockTitle}>Portfolio Snapshot</h2>
                  <p className={styles.sectionText}>
                    These summary cards are based on the artworks currently tied
                    to your artist profile, with local drafts counted separately.
                  </p>

                  <div className={styles.summaryGrid}>
                    <article className={styles.summaryCard}>
                      <p className={styles.summaryLabel}>Listed artworks</p>
                      <p className={styles.summaryValue}>{listedArtworksCount}</p>
                    </article>

                    <article className={styles.summaryCard}>
                      <p className={styles.summaryLabel}>Local drafts</p>
                      <p className={styles.summaryValue}>{draftArtworksCount}</p>
                    </article>

                    <article className={styles.summaryCard}>
                      <p className={styles.summaryLabel}>Trending pieces</p>
                      <p className={styles.summaryValue}>{trendingArtworksCount}</p>
                    </article>

                    <article className={styles.summaryCard}>
                      <p className={styles.summaryLabel}>Total listed value</p>
                      <p className={styles.summaryValue}>
                        {formatPrice(totalPortfolioValue)}
                      </p>
                    </article>
                  </div>
                </section>

                <section className={styles.topSellingBlock}>
                  <h2 className={styles.blockTitle}>Your Artworks</h2>
                  <p className={styles.sectionText}>
                    Recent published artworks and local upload drafts.
                  </p>

                  <ul className={styles.topSellingList}>
                    {draftArtworks.map((artwork) => (
                      <li
                        key={artwork.id}
                        className={`${styles.topSellingItem} ${styles.draftItem}`}
                      >
                        <img
                          className={styles.topSellingImage}
                          src={artwork.image}
                          alt={artwork.title}
                        />
                        <div className={styles.topSellingContent}>
                          <p className={styles.draftTitle}>{artwork.title}</p>
                          <span className={styles.topSellingMeta}>
                            {artwork.medium} | Local draft
                          </span>
                          <span className={styles.draftBadge}>
                            Pending review
                          </span>
                        </div>
                        <span className={styles.topSellingPrice}>
                          {formatPrice(artwork.price)}
                        </span>
                      </li>
                    ))}

                    {recentArtworks.map((artwork) => (
                      <li key={artwork.id} className={styles.topSellingItem}>
                        <img
                          className={styles.topSellingImage}
                          src={artwork.image}
                          alt={artwork.title}
                        />
                        <div className={styles.topSellingContent}>
                          <Link
                            to={`/artworks/${artwork.slug}`}
                            className={styles.topSellingLink}
                          >
                            {artwork.title}
                          </Link>
                          <span className={styles.topSellingMeta}>
                            {artwork.medium} | {artwork.year}
                          </span>
                        </div>
                        <span className={styles.topSellingPrice}>
                          {formatPrice(artwork.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className={styles.profileBlock}>
                <h2 className={styles.blockTitle}>Profile Management</h2>
                <div className={styles.profileSummary}>
                  {dashboardArtist?.avatar && (
                    <img
                      className={styles.profileAvatar}
                      src={dashboardArtist.avatar}
                      alt={dashboardArtistName}
                    />
                  )}

                  <div className={styles.profileSummaryContent}>
                    <p className={styles.profileName}>{dashboardArtistName}</p>
                    <p className={styles.profileMeta}>
                      Signed in as @{currentUser.username} | {currentUser.email}
                    </p>
                    {dashboardArtist && (
                      <Link
                        to={`/artists/${dashboardArtist.slug}`}
                        className={styles.profileLink}
                      >
                        View public artist page
                      </Link>
                    )}
                  </div>
                </div>

                <form
                  className={styles.profileForm}
                  onSubmit={handleProfileSubmit}
                  noValidate
                >
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="dashboard-bio">
                      Bio
                    </label>
                    <input
                      className={`${styles.input} ${
                        getProfileFieldError("profileBio")
                          ? styles.inputError
                          : ""
                      }`}
                      id="dashboard-bio"
                      name="profileBio"
                      type="text"
                      placeholder="Write a short artist bio"
                      value={profileFormik.values.profileBio}
                      onBlur={profileFormik.handleBlur}
                      onChange={handleProfileChange}
                    />
                    {getProfileFieldError("profileBio") && (
                      <p className={styles.errorText} role="alert">
                        {getProfileFieldError("profileBio")}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="dashboard-website">
                      Profile Links
                    </label>

                    <div className={styles.socialGrid}>
                      <input
                        className={`${styles.input} ${
                          getProfileFieldError("profileWebsite")
                            ? styles.inputError
                            : ""
                        }`}
                        id="dashboard-website"
                        name="profileWebsite"
                        type="text"
                        placeholder="Website"
                        value={profileFormik.values.profileWebsite}
                        onBlur={profileFormik.handleBlur}
                        onChange={handleProfileChange}
                      />
                      <input
                        className={styles.input}
                        id="dashboard-instagram"
                        name="profileInstagram"
                        type="text"
                        placeholder="Instagram"
                        value={profileFormik.values.profileInstagram}
                        onBlur={profileFormik.handleBlur}
                        onChange={handleProfileChange}
                      />
                    </div>

                    {getProfileFieldError("profileWebsite") && (
                      <p className={styles.errorText} role="alert">
                        {getProfileFieldError("profileWebsite")}
                      </p>
                    )}
                  </div>

                  <div className={styles.profileActions}>
                    <button className={styles.primaryButton} type="submit">
                      Save Profile
                    </button>

                    {profileSuccessMessage && (
                      <p className={styles.successText}>
                        {profileSuccessMessage}
                      </p>
                    )}
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
