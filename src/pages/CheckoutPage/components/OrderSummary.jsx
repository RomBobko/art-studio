import PropTypes from "prop-types";
import styles from "../CheckoutPage.module.css";

const OrderSummary = ({ orderItems, subtotal, total, formatPrice }) => {
  return (
    <section className={styles.summaryBlock}>
      <h2 className={styles.blockTitle}>Order Summary</h2>

      <div className={styles.summaryTable}>
        {orderItems.map((item) => (
          <div className={styles.summaryRow} key={item.id}>
            <span className={styles.summaryLabel}>{item.title}</span>
            <span className={styles.summaryValue}>
              {formatPrice(item.price)}
            </span>
          </div>
        ))}

        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>{formatPrice(subtotal)}</span>
        </div>

        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span className={styles.summaryLabel}>Total</span>
          <span className={styles.summaryValue}>{formatPrice(total)}</span>
        </div>
      </div>
    </section>
  );
};

OrderSummary.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  subtotal: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  formatPrice: PropTypes.func.isRequired,
};

export default OrderSummary;
