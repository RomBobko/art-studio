import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineXMark } from "react-icons/hi2";
import styles from "./CartDrawer.module.css";
import { useCart } from "../../../context/CartContext";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const CartDrawer = ({ onClose }) => {
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const {
    cartItems,
    itemCount,
    subtotal,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousFocusedElement = document.activeElement;

    document.body.style.overflow = "hidden";
    document.body.classList.add("cart-drawer-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.classList.remove("cart-drawer-open");
      window.removeEventListener("keydown", handleKeyDown);

      if (previousFocusedElement instanceof HTMLElement) {
        previousFocusedElement.focus();
      }
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        id="cart-drawer"
        className={styles.drawer}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        aria-describedby="cart-drawer-description"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerTopRow}>
            <p className={styles.headerCount}>
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </p>

            <button
              className={styles.closeButton}
              ref={closeButtonRef}
              type="button"
              aria-label="Close cart"
              onClick={onClose}
            >
              <HiOutlineXMark className={styles.closeIcon} />
            </button>
          </div>

          <div className={styles.headerContent}>
            <h1 id="cart-drawer-title" className={styles.title}>
              Shopping Cart
            </h1>
            <p id="cart-drawer-description" className={styles.description}>
              Review your selected artworks before moving to checkout.
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.drawerBody}>
            <div className={styles.emptyState}>
              <h2 className={styles.emptyTitle}>Your cart is empty</h2>
              <p className={styles.emptyText}>
                Add a few artworks to see them here before checkout.
              </p>

              <Link
                className={styles.secondaryButton}
                to="/discover"
                onClick={onClose}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.drawerBody}>
              <div className={styles.itemsPanel}>
                <div className={styles.panelHeader}>
                  <h2 className={styles.panelTitle}>Cart Items</h2>
                  <p className={styles.panelText}>
                    {itemCount} item{itemCount > 1 ? "s" : ""} in your cart
                  </p>
                </div>

                <ul className={styles.itemList}>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <article className={styles.itemCard}>
                        <img
                          className={styles.itemImage}
                          src={item.image}
                          alt={item.title}
                        />

                        <div className={styles.itemContent}>
                          <div className={styles.itemDetails}>
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                            <p className={styles.artistName}>
                              {item.artistName}
                            </p>
                            <p className={styles.medium}>{item.medium}</p>
                          </div>

                          <div className={styles.itemFooter}>
                            <div className={styles.quantityControl}>
                              <button
                                className={styles.quantityButton}
                                type="button"
                                onClick={() => decreaseQuantity(item.id)}
                                disabled={item.quantity === 1}
                                aria-label={`Decrease quantity for ${item.title}`}
                              >
                                -
                              </button>

                              <span className={styles.quantityValue}>
                                {item.quantity}
                              </span>

                              <button
                                className={styles.quantityButton}
                                type="button"
                                onClick={() => increaseQuantity(item.id)}
                                aria-label={`Increase quantity for ${item.title}`}
                              >
                                +
                              </button>
                            </div>

                            <div className={styles.itemMeta}>
                              <p className={styles.price}>
                                {formatPrice(item.price * item.quantity)}
                              </p>

                              <button
                                className={styles.removeButton}
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Remove ${item.title} from cart`}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>

                <div className={styles.actions}>
                  <Link
                    className={styles.secondaryButton}
                    to="/discover"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.drawerFooter}>
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
                    <span className={styles.summaryValue}>
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total</span>
                    <span className={styles.summaryValue}>
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  className={styles.primaryButton}
                  type="button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </aside>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

CartDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CartDrawer;
