import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  email: "",
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

const checkoutValidationSchema = Yup.object({
  fullName: Yup.string().trim().required("Enter your full name."),
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Enter your email address."),
  address: Yup.string().trim().required("Enter your address."),
  city: Yup.string().trim().required("Enter your city."),
  state: Yup.string().trim().required("Choose a state."),
  zipCode: Yup.string().trim().required("Enter your ZIP code."),
  paymentMethod: Yup.string().required("Choose a payment method."),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "Card",
    then: (schema) => schema.trim().required("Enter your card number."),
    otherwise: (schema) => schema.notRequired(),
  }),
  expiry: Yup.string().when("paymentMethod", {
    is: "Card",
    then: (schema) => schema.trim().required("Enter the expiry date."),
    otherwise: (schema) => schema.notRequired(),
  }),
  cvc: Yup.string().when("paymentMethod", {
    is: "Card",
    then: (schema) => schema.trim().required("Enter the CVC."),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const CheckoutPage = () => {
  const {
    cartItems,
    itemCount,
    subtotal: cartSubtotal,
    total: cartTotal,
    clearCart,
  } = useCart();
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
  const formik = useFormik({
    initialValues: INITIAL_CHECKOUT_VALUES,
    validationSchema: checkoutValidationSchema,
    onSubmit: (values, formikHelpers) => {
      if (!hasCartItems) {
        return;
      }

      setCompletedOrder({
        itemCount,
        total,
      });
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
      clearCart();
    },
  });
  const isCardPayment = formik.values.paymentMethod === "Card";

  const getFieldError = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  const handlePaymentMethodChange = (event) => {
    const nextPaymentMethod = event.target.value;

    formik.handleChange(event);

    if (nextPaymentMethod !== "Card") {
      formik.setFieldValue("cardNumber", "", false);
      formik.setFieldValue("expiry", "", false);
      formik.setFieldValue("cvc", "", false);
      formik.setFieldTouched("cardNumber", false, false);
      formik.setFieldTouched("expiry", false, false);
      formik.setFieldTouched("cvc", false, false);
    }
  };

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
            onSubmit={formik.handleSubmit}
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
                        aria-invalid={Boolean(getFieldError("fullName"))}
                        aria-label="Full name"
                        aria-describedby={
                          getFieldError("fullName")
                            ? "checkout-full-name-error"
                            : undefined
                        }
                        autoComplete="name"
                        className={styles.input}
                        id="checkout-full-name"
                        name="fullName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Full name"
                        type="text"
                        value={formik.values.fullName}
                      />
                      {getFieldError("fullName") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-full-name-error"
                          role="alert"
                        >
                          {getFieldError("fullName")}
                        </p>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(getFieldError("email"))}
                        aria-label="Email address"
                        aria-describedby={
                          getFieldError("email")
                            ? "checkout-email-error"
                            : undefined
                        }
                        autoComplete="email"
                        className={styles.input}
                        id="checkout-email"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Email address"
                        type="email"
                        value={formik.values.email}
                      />
                      {getFieldError("email") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-email-error"
                          role="alert"
                        >
                          {getFieldError("email")}
                        </p>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(getFieldError("address"))}
                        aria-label="Address"
                        aria-describedby={
                          getFieldError("address")
                            ? "checkout-address-error"
                            : undefined
                        }
                        autoComplete="street-address"
                        className={styles.input}
                        id="checkout-address"
                        name="address"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Address"
                        type="text"
                        value={formik.values.address}
                      />
                      {getFieldError("address") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-address-error"
                          role="alert"
                        >
                          {getFieldError("address")}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(getFieldError("city"))}
                        aria-label="City"
                        aria-describedby={
                          getFieldError("city") ? "checkout-city-error" : undefined
                        }
                        autoComplete="address-level2"
                        className={styles.input}
                        id="checkout-city"
                        name="city"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="City"
                        type="text"
                        value={formik.values.city}
                      />
                      {getFieldError("city") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-city-error"
                          role="alert"
                        >
                          {getFieldError("city")}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <select
                        aria-invalid={Boolean(getFieldError("state"))}
                        aria-label="State"
                        aria-describedby={
                          getFieldError("state")
                            ? "checkout-state-error"
                            : undefined
                        }
                        className={styles.select}
                        id="checkout-state"
                        name="state"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.state}
                      >
                        <option value="">State</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Texas">Texas</option>
                      </select>
                      {getFieldError("state") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-state-error"
                          role="alert"
                        >
                          {getFieldError("state")}
                        </p>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(getFieldError("zipCode"))}
                        aria-label="ZIP code"
                        aria-describedby={
                          getFieldError("zipCode")
                            ? "checkout-zip-error"
                            : undefined
                        }
                        autoComplete="postal-code"
                        className={styles.input}
                        id="checkout-zip"
                        inputMode="numeric"
                        name="zipCode"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="ZIP code"
                        type="text"
                        value={formik.values.zipCode}
                      />
                      {getFieldError("zipCode") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-zip-error"
                          role="alert"
                        >
                          {getFieldError("zipCode")}
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
                    getFieldError("paymentMethod")
                      ? "checkout-payment-method-error"
                      : undefined
                  }
                >
                  {["Card", "PayPal", "UPI"].map((method) => (
                    <label className={styles.option} key={method}>
                      <input
                        checked={formik.values.paymentMethod === method}
                        name="paymentMethod"
                        onBlur={formik.handleBlur}
                        onChange={handlePaymentMethodChange}
                        type="radio"
                        value={method}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
                {getFieldError("paymentMethod") && (
                  <p
                    className={styles.errorMessage}
                    id="checkout-payment-method-error"
                    role="alert"
                  >
                    {getFieldError("paymentMethod")}
                  </p>
                )}

                {isCardPayment ? (
                  <div className={styles.formGrid}>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <input
                        aria-invalid={Boolean(getFieldError("cardNumber"))}
                        aria-label="Card number"
                        aria-describedby={
                          getFieldError("cardNumber")
                            ? "checkout-card-number-error"
                            : undefined
                        }
                        autoComplete="cc-number"
                        className={styles.input}
                        id="checkout-card-number"
                        inputMode="numeric"
                        name="cardNumber"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="1234 1234 1234 1234"
                        type="text"
                        value={formik.values.cardNumber}
                      />
                      {getFieldError("cardNumber") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-card-number-error"
                          role="alert"
                        >
                          {getFieldError("cardNumber")}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(getFieldError("expiry"))}
                        aria-label="Card expiry date"
                        aria-describedby={
                          getFieldError("expiry")
                            ? "checkout-expiry-error"
                            : undefined
                        }
                        autoComplete="cc-exp"
                        className={styles.input}
                        id="checkout-expiry"
                        name="expiry"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="MM / YY"
                        type="text"
                        value={formik.values.expiry}
                      />
                      {getFieldError("expiry") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-expiry-error"
                          role="alert"
                        >
                          {getFieldError("expiry")}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <input
                        aria-invalid={Boolean(getFieldError("cvc"))}
                        aria-label="CVC"
                        aria-describedby={
                          getFieldError("cvc") ? "checkout-cvc-error" : undefined
                        }
                        autoComplete="cc-csc"
                        className={styles.input}
                        id="checkout-cvc"
                        inputMode="numeric"
                        name="cvc"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="CVC"
                        type="text"
                        value={formik.values.cvc}
                      />
                      {getFieldError("cvc") && (
                        <p
                          className={styles.errorMessage}
                          id="checkout-cvc-error"
                          role="alert"
                        >
                          {getFieldError("cvc")}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className={styles.helperText}>
                    {formik.values.paymentMethod} stays in demo mode for now.
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
