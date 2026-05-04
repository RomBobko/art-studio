import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../CheckoutPage.module.css";

const CheckoutSuccess = ({ completedOrder, formatPrice }) => {
  return (
    <div
      className={`${styles.checkoutCard} ${styles.successCard}`}
      role="status"
      aria-live="polite"
    >
      <h2 className={styles.successTitle}>Order placed successfully</h2>
      <p className={styles.successLead}>
        Your order for {completedOrder.itemCount} item
        {completedOrder.itemCount === 1 ? "" : "s"} has been completed locally.
      </p>

      <div
        className={styles.successSummary}
        aria-label="Completed order summary"
      >
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Items</span>
          <span className={styles.summaryValue}>{completedOrder.itemCount}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total</span>
          <span className={styles.summaryValue}>
            {formatPrice(completedOrder.total)}
          </span>
        </div>
      </div>

      <p className={styles.successNote}>
        No payment was processed. Your cart has been cleared and you can
        continue exploring more artwork.
      </p>

      <Link
        className={`${styles.primaryButton} ${styles.emptyAction}`}
        to="/discover"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

CheckoutSuccess.propTypes = {
  completedOrder: PropTypes.shape({
    itemCount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  formatPrice: PropTypes.func.isRequired,
};

export default CheckoutSuccess;
