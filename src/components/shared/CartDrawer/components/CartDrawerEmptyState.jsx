import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../CartDrawer.module.css";

const CartDrawerEmptyState = ({ onClose }) => (
  <div className={styles.drawerBody}>
    <div className={styles.emptyState}>
      <h2 className={styles.emptyTitle}>Your cart is empty</h2>
      <p className={styles.emptyText}>
        Add a few artworks to see them here before checkout.
      </p>

      <Link className={styles.secondaryButton} to="/discover" onClick={onClose}>
        Continue Shopping
      </Link>
    </div>
  </div>
);

CartDrawerEmptyState.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CartDrawerEmptyState;
