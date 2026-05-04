import PropTypes from "prop-types";
import styles from "../DashboardPage.module.css";

const DashboardHeader = ({ artistName }) => {
  return (
    <div className={styles.header}>
      <h1 id="dashboard-page-title" className={styles.title}>
        Artist Dashboard
      </h1>
      <p className={styles.description}>
        Manage the artworks currently shown on {artistName}&apos;s public
        profile, preview local upload drafts, and keep your artist details in
        one place.
      </p>
    </div>
  );
};

DashboardHeader.propTypes = {
  artistName: PropTypes.string.isRequired,
};

export default DashboardHeader;
