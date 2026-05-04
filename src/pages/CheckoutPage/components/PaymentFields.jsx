import PropTypes from "prop-types";
import styles from "../CheckoutPage.module.css";

const PAYMENT_METHODS = ["Card", "PayPal", "UPI"];

const PaymentFields = ({
  values,
  isCardPayment,
  getFieldError,
  handleBlur,
  handleChange,
  handlePaymentMethodChange,
}) => {
  return (
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
        {PAYMENT_METHODS.map((method) => (
          <label className={styles.option} key={method}>
            <input
              checked={values.paymentMethod === method}
              name="paymentMethod"
              onBlur={handleBlur}
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
            <label className={styles.fieldLabel} htmlFor="checkout-card-number">
              Card number
            </label>
            <input
              aria-invalid={Boolean(getFieldError("cardNumber"))}
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
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="1234 1234 1234 1234"
              type="text"
              value={values.cardNumber}
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
            <label className={styles.fieldLabel} htmlFor="checkout-expiry">
              Card expiry date
            </label>
            <input
              aria-invalid={Boolean(getFieldError("expiry"))}
              aria-describedby={
                getFieldError("expiry") ? "checkout-expiry-error" : undefined
              }
              autoComplete="cc-exp"
              className={styles.input}
              id="checkout-expiry"
              name="expiry"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="MM / YY"
              type="text"
              value={values.expiry}
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
            <label className={styles.fieldLabel} htmlFor="checkout-cvc">
              CVC
            </label>
            <input
              aria-invalid={Boolean(getFieldError("cvc"))}
              aria-describedby={
                getFieldError("cvc") ? "checkout-cvc-error" : undefined
              }
              autoComplete="cc-csc"
              className={styles.input}
              id="checkout-cvc"
              inputMode="numeric"
              name="cvc"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="CVC"
              type="text"
              value={values.cvc}
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
          {values.paymentMethod} stays in demo mode for now. No real payment
          will be processed.
        </p>
      )}
    </section>
  );
};

PaymentFields.propTypes = {
  values: PropTypes.shape({
    paymentMethod: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    expiry: PropTypes.string.isRequired,
    cvc: PropTypes.string.isRequired,
  }).isRequired,
  isCardPayment: PropTypes.bool.isRequired,
  getFieldError: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePaymentMethodChange: PropTypes.func.isRequired,
};

export default PaymentFields;
