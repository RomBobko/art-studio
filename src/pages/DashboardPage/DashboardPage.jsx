import { useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import styles from "./DashboardPage.module.css";
import blossomImage from "../../assets/images/blossom.webp";
import sunsetImage from "../../assets/images/sunset.webp";
import cityscapeImage from "../../assets/images/cityscape.webp";

const topSellingArtworks = [
  {
    id: 1,
    title: "Midnight Swirl",
    image: blossomImage,
  },
  {
    id: 2,
    title: "Wine and Woman",
    image: sunsetImage,
  },
  {
    id: 3,
    title: "Inner World",
    image: cityscapeImage,
  },
];

const INITIAL_UPLOAD_VALUES = {
  artworkTitle: "",
  artworkDescription: "",
  artworkFileName: "",
};

const INITIAL_PROFILE_VALUES = {
  profileBio: "",
  profileWebsite: "",
  profileTwitter: "",
};

const DashboardPage = () => {
  const artworkFileInputRef = useRef(null);
  const [uploadValues, setUploadValues] = useState(INITIAL_UPLOAD_VALUES);
  const [uploadErrors, setUploadErrors] = useState({});
  const [uploadPreview, setUploadPreview] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [profileValues, setProfileValues] = useState(INITIAL_PROFILE_VALUES);
  const [profileErrors, setProfileErrors] = useState({});
  const [profileSuccessMessage, setProfileSuccessMessage] = useState("");

  const handleUploadChange = (event) => {
    const { name, value } = event.target;

    setUploadValues((prevUploadValues) => ({
      ...prevUploadValues,
      [name]: value,
    }));

    setUploadSuccessMessage("");

    if (uploadErrors[name]) {
      setUploadErrors((prevUploadErrors) => ({
        ...prevUploadErrors,
        [name]: "",
      }));
    }
  };

  const handleArtworkImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setUploadSuccessMessage("");

    if (!selectedFile) {
      setUploadValues((prevUploadValues) => ({
        ...prevUploadValues,
        artworkFileName: "",
      }));
      setUploadPreview("");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setUploadValues((prevUploadValues) => ({
        ...prevUploadValues,
        artworkFileName: "",
      }));
      setUploadPreview("");
      if (artworkFileInputRef.current) {
        artworkFileInputRef.current.value = "";
      }
      setUploadErrors((prevUploadErrors) => ({
        ...prevUploadErrors,
        artworkImage: "Please choose a valid image file.",
      }));
      return;
    }

    setUploadValues((prevUploadValues) => ({
      ...prevUploadValues,
      artworkFileName: selectedFile.name,
    }));

    setUploadErrors((prevUploadErrors) => ({
      ...prevUploadErrors,
      artworkImage: "",
    }));

    const reader = new FileReader();

    reader.onload = () => {
      setUploadPreview(typeof reader.result === "string" ? reader.result : "");
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleUploadSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!uploadValues.artworkTitle.trim()) {
      nextErrors.artworkTitle = "Please enter an artwork title.";
    }

    if (!uploadPreview) {
      nextErrors.artworkImage = "Please choose an image for your artwork.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setUploadErrors(nextErrors);
      setUploadSuccessMessage("");
      return;
    }

    setUploadValues(INITIAL_UPLOAD_VALUES);
    setUploadErrors({});
    setUploadPreview("");
    setUploadSuccessMessage("Artwork details saved locally.");
    if (artworkFileInputRef.current) {
      artworkFileInputRef.current.value = "";
    }
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileValues((prevProfileValues) => ({
      ...prevProfileValues,
      [name]: value,
    }));

    setProfileSuccessMessage("");

    if (profileErrors[name]) {
      setProfileErrors((prevProfileErrors) => ({
        ...prevProfileErrors,
        [name]: "",
      }));
    }
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    const trimmedWebsite = profileValues.profileWebsite.trim();

    if (!profileValues.profileBio.trim()) {
      nextErrors.profileBio = "Please enter a short bio.";
    }

    if (
      trimmedWebsite &&
      (trimmedWebsite.includes(" ") || !trimmedWebsite.includes("."))
    ) {
      nextErrors.profileWebsite = "Please enter a valid website.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors);
      setProfileSuccessMessage("");
      return;
    }

    setProfileErrors({});
    setProfileSuccessMessage("Profile updated locally.");
  };

  return (
    <div className={styles.page}>
      <section
        className={styles.dashboardSection}
        aria-labelledby="dashboard-page-title"
      >
        <div className="container-narrow">
          <div className={styles.header}>
            <p className={styles.eyebrow}>Artist Dashboard</p>
            <h1 id="dashboard-page-title" className={styles.title}>
              Sell Your Art
            </h1>
            <p className={styles.description}>
              A simple workspace for uploading artwork, checking sales, and
              keeping your profile details in one place.
            </p>
          </div>

          <div className={styles.dashboardCard}>
            <div className={styles.layout}>
              <section className={styles.uploadBlock}>
                <h2 className={styles.blockTitle}>Upload Art</h2>

                <form className={styles.uploadForm} onSubmit={handleUploadSubmit}>
                  <label
                    className={styles.uploadPreview}
                    htmlFor="dashboard-art-image"
                  >
                    {uploadPreview ? (
                      <img
                        className={styles.uploadPreviewImage}
                        src={uploadPreview}
                        alt={
                          uploadValues.artworkTitle ||
                          uploadValues.artworkFileName ||
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
                    {uploadValues.artworkFileName
                      ? `Selected file: ${uploadValues.artworkFileName}`
                      : "PNG, JPG, or WEBP"}
                  </p>

                  {uploadErrors.artworkImage && (
                    <p className={styles.errorText} role="alert">
                      {uploadErrors.artworkImage}
                    </p>
                  )}

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="dashboard-art-title">
                      Title
                    </label>
                    <input
                      className={`${styles.input} ${
                        uploadErrors.artworkTitle ? styles.inputError : ""
                      }`}
                      id="dashboard-art-title"
                      name="artworkTitle"
                      type="text"
                      placeholder="Artwork title"
                      value={uploadValues.artworkTitle}
                      onChange={handleUploadChange}
                    />
                    {uploadErrors.artworkTitle && (
                      <p className={styles.errorText} role="alert">
                        {uploadErrors.artworkTitle}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label
                      className={styles.label}
                      htmlFor="dashboard-art-description"
                    >
                      Description
                    </label>
                    <textarea
                      className={styles.textarea}
                      id="dashboard-art-description"
                      name="artworkDescription"
                      rows="4"
                      placeholder="Write a short description"
                      value={uploadValues.artworkDescription}
                      onChange={handleUploadChange}
                    />
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
                  <h2 className={styles.blockTitle}>Sales Analytics</h2>
                  <p className={styles.analyticsLabel}>Total Earnings</p>

                  <div className={styles.analyticsContent}>
                    <div className={styles.analyticsScale}>
                      <span>$2,000</span>
                      <span>$2,000</span>
                      <span>$0</span>
                    </div>

                    <div className={styles.chartWrap}>
                      <svg
                        className={styles.chart}
                        viewBox="0 0 220 120"
                        aria-hidden="true"
                      >
                        <line x1="0" y1="100" x2="220" y2="100" />
                        <line x1="0" y1="70" x2="220" y2="70" />
                        <line x1="0" y1="40" x2="220" y2="40" />
                        <polyline
                          points="18,82 60,48 98,58 142,28 176,42 208,18"
                          fill="none"
                        />
                        <circle cx="18" cy="82" r="5" />
                        <circle cx="60" cy="48" r="5" />
                        <circle cx="98" cy="58" r="5" />
                        <circle cx="142" cy="28" r="5" />
                        <circle cx="176" cy="42" r="5" />
                        <circle cx="208" cy="18" r="5" />
                      </svg>

                      <div className={styles.monthLabels}>
                        <span>Jan</span>
                        <span>Mar</span>
                        <span>Aug</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className={styles.topSellingBlock}>
                  <h2 className={styles.blockTitle}>Top Selling</h2>

                  <ul className={styles.topSellingList}>
                    {topSellingArtworks.map((artwork) => (
                      <li key={artwork.id} className={styles.topSellingItem}>
                        <img
                          className={styles.topSellingImage}
                          src={artwork.image}
                          alt={artwork.title}
                        />
                        <span className={styles.topSellingTitle}>
                          {artwork.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className={styles.profileBlock}>
                <h2 className={styles.blockTitle}>Profile Management</h2>

                <form className={styles.profileForm} onSubmit={handleProfileSubmit}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="dashboard-bio">
                      Bio
                    </label>
                    <input
                      className={`${styles.input} ${
                        profileErrors.profileBio ? styles.inputError : ""
                      }`}
                      id="dashboard-bio"
                      name="profileBio"
                      type="text"
                      placeholder="Write a short artist bio"
                      value={profileValues.profileBio}
                      onChange={handleProfileChange}
                    />
                    {profileErrors.profileBio && (
                      <p className={styles.errorText} role="alert">
                        {profileErrors.profileBio}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="dashboard-website">
                      Social Links
                    </label>

                    <div className={styles.socialGrid}>
                      <input
                        className={`${styles.input} ${
                          profileErrors.profileWebsite ? styles.inputError : ""
                        }`}
                        id="dashboard-website"
                        name="profileWebsite"
                        type="text"
                        placeholder="Website"
                        value={profileValues.profileWebsite}
                        onChange={handleProfileChange}
                      />
                      <input
                        className={styles.input}
                        id="dashboard-twitter"
                        name="profileTwitter"
                        type="text"
                        placeholder="Twitter"
                        value={profileValues.profileTwitter}
                        onChange={handleProfileChange}
                      />
                    </div>

                    {profileErrors.profileWebsite && (
                      <p className={styles.errorText} role="alert">
                        {profileErrors.profileWebsite}
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
