import PropTypes from "prop-types";
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import styles from "../DashboardPage.module.css";

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

const DashboardProfileForm = ({
  currentUser,
  dashboardArtist,
  dashboardArtistName,
}) => {
  const [profileSuccessMessage, setProfileSuccessMessage] = useState("");

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

  const profileBioError = getProfileFieldError("profileBio");
  const profileWebsiteError = getProfileFieldError("profileWebsite");

  return (
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
              profileBioError ? styles.inputError : ""
            }`}
            id="dashboard-bio"
            name="profileBio"
            type="text"
            placeholder="Write a short artist bio"
            value={profileFormik.values.profileBio}
            onBlur={profileFormik.handleBlur}
            onChange={handleProfileChange}
            aria-invalid={Boolean(profileBioError)}
            aria-describedby={
              profileBioError ? "dashboard-bio-error" : undefined
            }
          />
          {profileBioError && (
            <p
              className={styles.errorText}
              id="dashboard-bio-error"
              role="alert"
            >
              {profileBioError}
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
                profileWebsiteError ? styles.inputError : ""
              }`}
              id="dashboard-website"
              name="profileWebsite"
              type="text"
              placeholder="Website"
              value={profileFormik.values.profileWebsite}
              onBlur={profileFormik.handleBlur}
              onChange={handleProfileChange}
              aria-invalid={Boolean(profileWebsiteError)}
              aria-describedby={
                profileWebsiteError ? "dashboard-website-error" : undefined
              }
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
              aria-label="Instagram profile"
            />
          </div>

          {profileWebsiteError && (
            <p
              className={styles.errorText}
              id="dashboard-website-error"
              role="alert"
            >
              {profileWebsiteError}
            </p>
          )}
        </div>

        <div className={styles.profileActions}>
          <button className={styles.primaryButton} type="submit">
            Save Profile
          </button>

          {profileSuccessMessage && (
            <p className={styles.successText} role="status" aria-live="polite">
              {profileSuccessMessage}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

DashboardProfileForm.propTypes = {
  currentUser: PropTypes.shape({
    bio: PropTypes.string,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    website: PropTypes.string,
    socialLinks: PropTypes.shape({
      instagram: PropTypes.string,
    }),
  }).isRequired,
  dashboardArtist: PropTypes.shape({
    avatar: PropTypes.string,
    bio: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }),
  dashboardArtistName: PropTypes.string.isRequired,
};

export default DashboardProfileForm;
