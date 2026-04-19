import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./CheckoutPage.module.css";
import { useCart } from "../../context/CartContext";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const INITIAL_CHECKOUT_VALUES = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  paymentMethod: "Card",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const INITIAL_COMPLETED_ORDER = null;

const CheckoutPage = () => {
  const {
    cartItems,
    itemCount,
    subtotal: cartSubtotal,
    total: cartTotal,
    clearCart,
  } = useCart();
  const [checkoutValues, setCheckoutValues] = useState(INITIAL_CHECKOUT_VALUES);
  const [checkoutErrors, setCheckoutErrors] = useState({});
  const [completedOrder, setCompletedOrder] = useState(INITIAL_COMPLETED_ORDER);
  const hasCartItems = cartItems.length > 0;

  const orderItems = cartItems.map((item) => ({
    id: item.id,
    title: `${item.title}${item.quantity > 1 ? ` x${item.quantity}` : ""}`,
    price: item.price * item.quantity,
  }));
  const subtotal = cartSubtotal;
  const total = cartTotal;
  const previewImage = cartItems[0]?.image;
  const previewAlt = `${cartItems[0]?.title || "Artwork"} selected for checkout`;
  const isCardPayment = checkoutValues.paymentMethod === "Card";

  if (completedOrder) {
    return (
      <div className={styles.page}>
        <section
          className={styles.checkoutSection}
          aria-labelledby="checkout-page-title"
        >
          <div className="container-narrow">
            <div className={styles.header}>
              <h1 id="checkout-page-title" className={styles.title}>
                Checkout
              </h1>
            </div>

            <div
              className={`${styles.checkoutCard} ${styles.successCard}`}
              role="status"
              aria-live="polite"
            >
              <h2 className={styles.successTitle}>Order placed successfully</h2>
              <p className={styles.successLead}>
                Your order for {completedOrder.itemCount} item
                {completedOrder.itemCount === 1 ? "" : "s"} has been completed
                locally.
              </p>

              <div className={styles.successSummary} aria-label="Completed order summary">
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Items</span>
                  <span className={styles.summaryValue}>
                    {completedOrder.itemCount}
                  </span>
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
          </div>
        </section>
      </div>
    );
  }

  if (!hasCartItems) {
    return (
      <div className={styles.page}>
        <section
          className={styles.checkoutSection}
          aria-labelledby="checkout-page-title"
        >
          <div className="container-narrow">
            <div className={styles.header}>
              <h1 id="checkout-page-title" className={styles.title}>
                Checkout
              </h1>
            </div>

            <div className={`${styles.checkoutCard} ${styles.emptyCard}`}>
              <h2 className={styles.emptyTitle}>Your cart is empty</h2>
              <p className={styles.emptyText}>
                Add a few artworks before moving to checkout.
              </p>
              <Link
                className={`${styles.primaryButton} ${styles.emptyAction}`}
                to="/discover"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const nextErrors = {
      ...checkoutErrors,
      [name]: "",
    };

    if (name === "paymentMethod" && value !== "Card") {
      nextErrors.cardNumber = "";
      nextErrors.expiry = "";
      nextErrors.cvc = "";
    }

    setCheckoutValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setCheckoutErrors(nextErrors);
  };

  const validateCheckoutValues = (values) => {
    const nextErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!values.address.trim()) {
      nextErrors.address = "Enter your address.";
    }

    if (!values.city.trim()) {
      nextErrors.city = "Enter your city.";
    }

    if (!values.state.trim()) {
      nextErrors.state = "Choose a state.";
    }

    if (!values.zipCode.trim()) {
      nextErrors.zipCode = "Enter your ZIP code.";
    }

    if (!values.paymentMethod.trim()) {
      nextErrors.paymentMethod = "Choose a payment method.";
    }

    if (values.paymentMethod === "Card") {
      if (!values.cardNumber.trim()) {
        nextErrors.cardNumber = "Enter your card number.";
      }

      if (!values.expiry.trim()) {
        nextErrors.expiry = "Enter the expiry date.";
      }

      if (!values.cvc.trim()) {
        nextErrors.cvc = "Enter the CVC.";
      }
    }

    return nextErrors;
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();

    if (!hasCartItems) {
      return;
    }

    const nextErrors = validateCheckoutValues(checkoutValues);

    if (Object.keys(nextErrors).length > 0) {
      setCheckoutErrors(nextErrors);
      return;
    }

    setCheckoutErrors({});
    setCompletedOrder({
      itemCount,
      total,
    });
    setCheckoutValues(INITIAL_CHECKOUT_VALUES);
    clearCart();
  };

  return (
    <div className={styles.page}>
      <section
        className={styles.checkoutSection}
        aria-labelledby="checkout-page-title"
      >
        <div className="container-narrow">
          <div className={styles.header}>
            <h1 id="checkout-page-title" className={styles.title}>
              Checkout
            </h1>
          </div>

          <form
            className={styles.checkoutForm}
            onSubmit={handleCheckoutSubmit}
            noValidate
          >
            <div className={styles.checkoutCard}>
              <div className={styles.topRow}>
                <section className={styles.previewBlock}>
                  <div className={styles.previewImageWrap}>
                    <img
                      className={styles.previewImage}
                      src={previewImage}
                      alt={previewAlt}
                    />
                  </div>
                </section>

                <section className={styles.shippingBlock}>
                  <h2 className={styles.blockTitle}>Shipping Address</h2>

                  <div className={styles.formGrid}>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.fullName)}
                        aria-label="Full name"
                        aria-describedby={
                          checkoutErrors.fullName
                            ? "checkout-full-name-error"
                            : undefined
                        }
                        autoComplete="name"
                        className={styles.input}
                        id="checkout-full-name"
                        name="fullName"
                        onChange={handleInputChange}
                        placeholder="Full name"
                        type="text"
                        value={checkoutValues.fullName}
                      />
                      {checkoutErrors.fullName && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-full-name-error"
                          role="alert"
                        >
                          {checkoutErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.address)}
                        aria-label="Address"
                        aria-describedby={
                          checkoutErrors.address
                            ? "checkout-address-error"
                            : undefined
                        }
                        autoComplete="street-address"
                        className={styles.input}
                        id="checkout-address"
                        name="address"
                        onChange={handleInputChange}
                        placeholder="Address"
                        type="text"
                        value={checkoutValues.address}
                      />
                      {checkoutErrors.address && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-address-error"
                          role="alert"
                        >
                          {checkoutErrors.address}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.city)}
                        aria-label="City"
                        aria-describedby={
                          checkoutErrors.city ? "checkout-city-error" : undefined
                        }
                        autoComplete="address-level2"
                        className={styles.input}
                        id="checkout-city"
                        name="city"
                        onChange={handleInputChange}
                        placeholder="City"
                        type="text"
                        value={checkoutValues.city}
                      />
                      {checkoutErrors.city && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-city-error"
                          role="alert"
                        >
                          {checkoutErrors.city}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <select
                        aria-invalid={Boolean(checkoutErrors.state)}
                        aria-label="State"
                        aria-describedby={
                          checkoutErrors.state ? "checkout-state-error" : undefined
                        }
                        className={styles.select}
                        id="checkout-state"
                        name="state"
                        onChange={handleInputChange}
                        value={checkoutValues.state}
                      >
                        <option value="">State</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Texas">Texas</option>
                      </select>
                      {checkoutErrors.state && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-state-error"
                          role="alert"
                        >
                          {checkoutErrors.state}
                        </p>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.zipCode)}
                        aria-label="ZIP code"
                        aria-describedby={
                          checkoutErrors.zipCode
                            ? "checkout-zip-error"
                            : undefined
                        }
                        autoComplete="postal-code"
                        className={styles.input}
                        id="checkout-zip"
                        inputMode="numeric"
                        name="zipCode"
                        onChange={handleInputChange}
                        placeholder="ZIP code"
                        type="text"
                        value={checkoutValues.zipCode}
                      />
                      {checkoutErrors.zipCode && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-zip-error"
                          role="alert"
                        >
                          {checkoutErrors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              <section className={styles.billingBlock}>
                <h2 className={styles.blockTitle}>Billing Details</h2>

                <div
                  className={styles.paymentOptions}
                  role="radiogroup"
                  aria-label="Payment method"
                  aria-describedby={
                    checkoutErrors.paymentMethod
                      ? "checkout-payment-method-error"
                      : undefined
                  }
                >
                  {["Card", "PayPal", "UPI"].map((method) => (
                    <label className={styles.option} key={method}>
                      <input
                        checked={checkoutValues.paymentMethod === method}
                        name="paymentMethod"
                        onChange={handleInputChange}
                        type="radio"
                        value={method}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
                {checkoutErrors.paymentMethod && (
                  <p
                    className={styles.errorMessage}
                    id="checkout-payment-method-error"
                    role="alert"
                  >
                    {checkoutErrors.paymentMethod}
                  </p>
                )}

                {isCardPayment ? (
                  <div className={styles.formGrid}>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.cardNumber)}
                        aria-label="Card number"
                        aria-describedby={
                          checkoutErrors.cardNumber
                            ? "checkout-card-number-error"
                            : undefined
                        }
                        autoComplete="cc-number"
                        className={styles.input}
                        id="checkout-card-number"
                        inputMode="numeric"
                        name="cardNumber"
                        onChange={handleInputChange}
                        placeholder="1234 1234 1234 1234"
                        type="text"
                        value={checkoutValues.cardNumber}
                      />
                      {checkoutErrors.cardNumber && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-card-number-error"
                          role="alert"
                        >
                          {checkoutErrors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.expiry)}
                        aria-label="Card expiry date"
                        aria-describedby={
                          checkoutErrors.expiry
                            ? "checkout-expiry-error"
                            : undefined
                        }
                        autoComplete="cc-exp"
                        className={styles.input}
                        id="checkout-expiry"
                        name="expiry"
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        type="text"
                        value={checkoutValues.expiry}
                      />
                      {checkoutErrors.expiry && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-expiry-error"
                          role="alert"
                        >
                          {checkoutErrors.expiry}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.cvc)}
                        aria-label="CVC"
                        aria-describedby={
                          checkoutErrors.cvc ? "checkout-cvc-error" : undefined
                        }
                        autoComplete="cc-csc"
                        className={styles.input}
                        id="checkout-cvc"
                        inputMode="numeric"
                        name="cvc"
                        onChange={handleInputChange}
                        placeholder="CVC"
                        type="text"
                        value={checkoutValues.cvc}
                      />
                      {checkoutErrors.cvc && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-cvc-error"
                          role="alert"
                        >
                          {checkoutErrors.cvc}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className={styles.helperText}>
                    {checkoutValues.paymentMethod} stays in demo mode for now.
                    No real payment will be processed.
                  </p>
                )}
              </section>

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
                    <span className={styles.summaryValue}>
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span className={styles.summaryLabel}>Total</span>
                    <span className={styles.summaryValue}>
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <button className={styles.primaryButton} type="submit">
              Place Order
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
