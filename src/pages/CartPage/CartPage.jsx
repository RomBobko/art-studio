import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CartPage.module.css";
import blossomImage from "../../assets/images/blossom.webp";
import cityscapeImage from "../../assets/images/cityscape.webp";

const initialCartItems = [
  {
    id: 1,
    title: "Morning Window",
    artistName: "Elena Novak",
    medium: "Acrylic on canvas",
    price: 350,
    image: blossomImage,
    quantity: 1,
  },
  {
    id: 2,
    title: "Inner Light",
    artistName: "Amelia Brooks",
    medium: "Graphite sketch",
    price: 215,
    image: cityscapeImage,
    quantity: 1,
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal;

  const handleIncreaseQuantity = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId),
    );
  };

  return (
    <div className={styles.page}>
      <section className={styles.cartSection} aria-labelledby="cart-page-title">
        <div className="container-narrow">
          <div className={styles.header}>
            <p className={styles.eyebrow}>Cart</p>
            <h1 id="cart-page-title" className={styles.title}>
              Shopping Cart
            </h1>
            <p className={styles.description}>
              Review your selected artworks before moving to checkout.
            </p>
          </div>

          <div className={styles.cartCard}>
            {cartItems.length === 0 ? (
              <div className={styles.emptyState}>
                <h2 className={styles.emptyTitle}>Your cart is empty</h2>
                <p className={styles.emptyText}>
                  Add a few artworks to see them here before checkout.
                </p>

                <Link className={styles.secondaryButton} to="/discover">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className={styles.layout}>
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
                            <div>
                              <h3 className={styles.itemTitle}>{item.title}</h3>
                              <p className={styles.artistName}>
                                {item.artistName}
                              </p>
                              <p className={styles.medium}>{item.medium}</p>
                            </div>

                            <div className={styles.itemControls}>
                              <div className={styles.quantityControl}>
                                <button
                                  className={styles.quantityButton}
                                  type="button"
                                  onClick={() => handleDecreaseQuantity(item.id)}
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
                                  onClick={() => handleIncreaseQuantity(item.id)}
                                  aria-label={`Increase quantity for ${item.title}`}
                                >
                                  +
                                </button>
                              </div>

                              <p className={styles.price}>
                                {formatPrice(item.price * item.quantity)}
                              </p>

                              <button
                                className={styles.removeButton}
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.actions}>
                    <Link className={styles.secondaryButton} to="/discover">
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                <aside
                  className={styles.summaryPanel}
                  aria-label="Order summary"
                >
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

                  <button className={styles.primaryButton} type="button">
                    Checkout
                  </button>
                </aside>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
