import PropTypes from "prop-types";
import styles from "../CartDrawer.module.css";

const CartDrawerItem = ({
  item,
  priceLabel,
  onDecrease,
  onIncrease,
  onRemove,
}) => (
  <li>
    <article className={styles.itemCard}>
      <img className={styles.itemImage} src={item.image} alt={item.title} />

      <div className={styles.itemContent}>
        <div className={styles.itemDetails}>
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <p className={styles.artistName}>{item.artistName}</p>
          <p className={styles.medium}>{item.medium}</p>
        </div>

        <div className={styles.itemFooter}>
          <div className={styles.quantityControl}>
            <button
              className={styles.quantityButton}
              type="button"
              onClick={onDecrease}
              disabled={item.quantity === 1}
              aria-label={`Decrease quantity for ${item.title}`}
            >
              -
            </button>

            <span className={styles.quantityValue}>{item.quantity}</span>

            <button
              className={styles.quantityButton}
              type="button"
              onClick={onIncrease}
              aria-label={`Increase quantity for ${item.title}`}
            >
              +
            </button>
          </div>

          <div className={styles.itemMeta}>
            <p className={styles.price}>{priceLabel}</p>

            <button
              className={styles.removeButton}
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${item.title} from cart`}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  </li>
);

CartDrawerItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  priceLabel: PropTypes.string.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartDrawerItem;
