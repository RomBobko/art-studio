import PropTypes from "prop-types";
import styles from "../CheckoutPage.module.css";

const ShippingFields = ({ values, getFieldError, handleBlur, handleChange }) => {
  return (
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
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Full name"
            type="text"
            value={values.fullName}
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
              getFieldError("email") ? "checkout-email-error" : undefined
            }
            autoComplete="email"
            className={styles.input}
            id="checkout-email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Email address"
            type="email"
            value={values.email}
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
              getFieldError("address") ? "checkout-address-error" : undefined
            }
            autoComplete="street-address"
            className={styles.input}
            id="checkout-address"
            name="address"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Address"
            type="text"
            value={values.address}
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
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="City"
            type="text"
            value={values.city}
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
              getFieldError("state") ? "checkout-state-error" : undefined
            }
            className={styles.select}
            id="checkout-state"
            name="state"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.state}
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
              getFieldError("zipCode") ? "checkout-zip-error" : undefined
            }
            autoComplete="postal-code"
            className={styles.input}
            id="checkout-zip"
            inputMode="numeric"
            name="zipCode"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="ZIP code"
            type="text"
            value={values.zipCode}
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
  );
};

ShippingFields.propTypes = {
  values: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
  }).isRequired,
  getFieldError: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ShippingFields;
