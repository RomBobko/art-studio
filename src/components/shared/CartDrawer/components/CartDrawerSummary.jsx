import PropTypes from "prop-types";
import styles from "../CartDrawer.module.css";

const CartDrawerSummary = ({ subtotalLabel, totalLabel, onCheckout }) => (
  <aside className={styles.summaryPanel} aria-label="Order summary">
    <div className={styles.panelHeader}>
      <h2 className={styles.panelTitle}>Order Summary</h2>
      <p className={styles.panelText}>
        Updated automatically from your current cart.
      </p>
    </div>

    <div className={styles.summaryRows}>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Subtotal</span>
        <span className={styles.summaryValue}>{subtotalLabel}</span>
      </div>

      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Total</span>
        <span className={styles.summaryValue}>{totalLabel}</span>
      </div>
    </div>

    <button className={styles.primaryButton} type="button" onClick={onCheckout}>
      Checkout
    </button>
  </aside>
);

CartDrawerSummary.propTypes = {
  subtotalLabel: PropTypes.string.isRequired,
  totalLabel: PropTypes.string.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CartDrawerSummary;
