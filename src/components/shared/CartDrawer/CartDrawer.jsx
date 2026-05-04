import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineXMark } from "react-icons/hi2";
import styles from "./CartDrawer.module.css";
import CartDrawerEmptyState from "./components/CartDrawerEmptyState";
import CartDrawerItem from "./components/CartDrawerItem";
import CartDrawerSummary from "./components/CartDrawerSummary";
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
          <CartDrawerEmptyState onClose={onClose} />
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
                    <CartDrawerItem
                      key={item.id}
                      item={item}
                      priceLabel={formatPrice(item.price * item.quantity)}
                      onDecrease={() => decreaseQuantity(item.id)}
                      onIncrease={() => increaseQuantity(item.id)}
                      onRemove={() => removeFromCart(item.id)}
                    />
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
              <CartDrawerSummary
                subtotalLabel={formatPrice(subtotal)}
                totalLabel={formatPrice(total)}
                onCheckout={handleCheckout}
              />
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
