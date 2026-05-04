import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../CheckoutPage.module.css";

const CheckoutEmptyState = ({ title, text }) => {
  return (
    <div className={`${styles.checkoutCard} ${styles.emptyCard}`}>
      <h2 className={styles.emptyTitle}>{title}</h2>
      <p className={styles.emptyText}>{text}</p>
      <Link
        className={`${styles.primaryButton} ${styles.emptyAction}`}
        to="/discover"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

CheckoutEmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CheckoutEmptyState;
