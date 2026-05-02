import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  const [uploadValues, setUploadValues] = useState(INITIAL_UPLOAD_VALUES);
  const [uploadErrors, setUploadErrors] = useState({});
  const [uploadPreview, setUploadPreview] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [draftArtworks, setDraftArtworks] = useState([]);
  const [profileValues, setProfileValues] = useState(() => ({
    profileBio: currentUser.bio || dashboardArtist?.bio || "",
    profileWebsite: currentUser.website || "",
    profileInstagram: currentUser.socialLinks?.instagram || "",
  }));
  const [profileErrors, setProfileErrors] = useState({});
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
    const trimmedTitle = uploadValues.artworkTitle.trim();
    const trimmedMedium = uploadValues.artworkMedium.trim();
    const trimmedPrice = uploadValues.artworkPrice.trim();
    const draftPrice = Number(trimmedPrice);

    if (!trimmedTitle) {
      nextErrors.artworkTitle = "Please enter an artwork title.";
    }

    if (!trimmedMedium) {
      nextErrors.artworkMedium = "Please enter the artwork medium.";
    }

    if (!trimmedPrice) {
      nextErrors.artworkPrice = "Please enter the artwork price.";
    } else if (Number.isNaN(draftPrice) || draftPrice <= 0) {
      nextErrors.artworkPrice = "Please enter a price greater than 0.";
    }

    if (!uploadPreview) {
      nextErrors.artworkImage = "Please choose an image for your artwork.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setUploadErrors(nextErrors);
      setUploadSuccessMessage("");
      return;
    }

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
    setUploadValues(INITIAL_UPLOAD_VALUES);
    setUploadErrors({});
    setUploadPreview("");
    setUploadSuccessMessage(`${trimmedTitle} was added as a local draft.`);
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
                      htmlFor="dashboard-art-medium"
                    >
                      Medium
                    </label>
                    <input
                      className={`${styles.input} ${
                        uploadErrors.artworkMedium ? styles.inputError : ""
                      }`}
                      id="dashboard-art-medium"
                      name="artworkMedium"
                      type="text"
                      placeholder="Example: Acrylic on canvas"
                      value={uploadValues.artworkMedium}
                      onChange={handleUploadChange}
                    />
                    {uploadErrors.artworkMedium && (
                      <p className={styles.errorText} role="alert">
                        {uploadErrors.artworkMedium}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="dashboard-art-price">
                      Price
                    </label>
                    <input
                      className={`${styles.input} ${
                        uploadErrors.artworkPrice ? styles.inputError : ""
                      }`}
                      id="dashboard-art-price"
                      name="artworkPrice"
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Price in USD"
                      value={uploadValues.artworkPrice}
                      onChange={handleUploadChange}
                    />
                    {uploadErrors.artworkPrice && (
                      <p className={styles.errorText} role="alert">
                        {uploadErrors.artworkPrice}
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
                      Profile Links
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
                        id="dashboard-instagram"
                        name="profileInstagram"
                        type="text"
                        placeholder="Instagram"
                        value={profileValues.profileInstagram}
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
