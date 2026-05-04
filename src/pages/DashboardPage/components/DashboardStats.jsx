import PropTypes from "prop-types";
import styles from "../DashboardPage.module.css";

const DashboardStats = ({
  listedArtworksCount,
  draftArtworksCount,
  trendingArtworksCount,
  totalPortfolioValue,
  formatPrice,
}) => {
  return (
    <section className={styles.analyticsBlock}>
      <h2 className={styles.blockTitle}>Portfolio Snapshot</h2>
      <p className={styles.sectionText}>
        These summary cards are based on the artworks currently tied to your
        artist profile, with local drafts counted separately.
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
          <p className={styles.summaryValue}>{formatPrice(totalPortfolioValue)}</p>
        </article>
      </div>
    </section>
  );
};

DashboardStats.propTypes = {
  listedArtworksCount: PropTypes.number.isRequired,
  draftArtworksCount: PropTypes.number.isRequired,
  trendingArtworksCount: PropTypes.number.isRequired,
  totalPortfolioValue: PropTypes.number.isRequired,
  formatPrice: PropTypes.func.isRequired,
};

export default DashboardStats;
