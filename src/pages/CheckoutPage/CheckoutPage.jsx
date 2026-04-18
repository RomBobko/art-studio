import { useState } from "react";
import { useLocation } from "react-router-dom";
import abstractImage from "../../assets/images/abstract.webp";
import styles from "./CheckoutPage.module.css";

const fallbackOrderItems = [
  {
    id: 1,
    title: "Abstract painting",
    price: 250,
  },
  {
    id: 2,
    title: "Art print",
    price: 25,
  },
];

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

const CheckoutPage = () => {
  const location = useLocation();
  const [checkoutValues, setCheckoutValues] = useState(INITIAL_CHECKOUT_VALUES);
  const [checkoutErrors, setCheckoutErrors] = useState({});
  const [checkoutSuccessMessage, setCheckoutSuccessMessage] = useState("");
  const passedCheckoutData = location.state?.checkoutData;
  const hasCartState =
    Array.isArray(passedCheckoutData?.cartItems) &&
    passedCheckoutData.cartItems.length > 0;

  const orderItems = hasCartState
    ? passedCheckoutData.cartItems.map((item) => ({
        id: item.id,
        title: `${item.title}${item.quantity > 1 ? ` x${item.quantity}` : ""}`,
        price: item.price * item.quantity,
      }))
    : fallbackOrderItems;

  const fallbackSubtotal = fallbackOrderItems.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  const subtotal = hasCartState ? passedCheckoutData.subtotal : fallbackSubtotal;
  const total = hasCartState ? passedCheckoutData.total : subtotal;
  const previewImage = hasCartState
    ? passedCheckoutData.cartItems[0]?.image || abstractImage
    : abstractImage;
  const previewAlt = hasCartState
    ? `${passedCheckoutData.cartItems[0]?.title || "Artwork"} selected for checkout`
    : "Abstract artwork selected for checkout";
  const isCardPayment = checkoutValues.paymentMethod === "Card";

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

    setCheckoutSuccessMessage("");
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

    const nextErrors = validateCheckoutValues(checkoutValues);

    if (Object.keys(nextErrors).length > 0) {
      setCheckoutErrors(nextErrors);
      setCheckoutSuccessMessage("");
      return;
    }

    setCheckoutErrors({});
    setCheckoutSuccessMessage("Order placed locally. No payment was processed.");
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

          <form className={styles.checkoutForm} onSubmit={handleCheckoutSubmit}>
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
                        className={styles.input}
                        id="checkout-full-name"
                        name="fullName"
                        onChange={handleInputChange}
                        placeholder="Full name"
                        type="text"
                        value={checkoutValues.fullName}
                      />
                      {checkoutErrors.fullName && (
                        <p className={styles.errorMessage}>
                          {checkoutErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.address)}
                        className={styles.input}
                        id="checkout-address"
                        name="address"
                        onChange={handleInputChange}
                        placeholder="Address"
                        type="text"
                        value={checkoutValues.address}
                      />
                      {checkoutErrors.address && (
                        <p className={styles.errorMessage}>
                          {checkoutErrors.address}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.city)}
                        className={styles.input}
                        id="checkout-city"
                        name="city"
                        onChange={handleInputChange}
                        placeholder="City"
                        type="text"
                        value={checkoutValues.city}
                      />
                      {checkoutErrors.city && (
                        <p className={styles.errorMessage}>
                          {checkoutErrors.city}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <select
                        aria-invalid={Boolean(checkoutErrors.state)}
                        className={styles.select}
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
                        <p className={styles.errorMessage}>
                          {checkoutErrors.state}
                        </p>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.zipCode)}
                        className={styles.input}
                        id="checkout-zip"
                        name="zipCode"
                        onChange={handleInputChange}
                        placeholder="ZIP code"
                        type="text"
                        value={checkoutValues.zipCode}
                      />
                      {checkoutErrors.zipCode && (
                        <p className={styles.errorMessage}>
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
                  <p className={styles.errorMessage}>
                    {checkoutErrors.paymentMethod}
                  </p>
                )}

                {isCardPayment ? (
                  <div className={styles.formGrid}>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.cardNumber)}
                        className={styles.input}
                        id="checkout-card-number"
                        name="cardNumber"
                        onChange={handleInputChange}
                        placeholder="1234 1234 1234 1234"
                        type="text"
                        value={checkoutValues.cardNumber}
                      />
                      {checkoutErrors.cardNumber && (
                        <p className={styles.errorMessage}>
                          {checkoutErrors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.expiry)}
                        className={styles.input}
                        id="checkout-expiry"
                        name="expiry"
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        type="text"
                        value={checkoutValues.expiry}
                      />
                      {checkoutErrors.expiry && (
                        <p className={styles.errorMessage}>
                          {checkoutErrors.expiry}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(checkoutErrors.cvc)}
                        className={styles.input}
                        id="checkout-cvc"
                        name="cvc"
                        onChange={handleInputChange}
                        placeholder="CVC"
                        type="text"
                        value={checkoutValues.cvc}
                      />
                      {checkoutErrors.cvc && (
                        <p className={styles.errorMessage}>
                          {checkoutErrors.cvc}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className={styles.helperText}>
                    {checkoutValues.paymentMethod} will be handled locally in a
                    later stage.
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

            {checkoutSuccessMessage && (
              <p className={styles.successMessage}>{checkoutSuccessMessage}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
