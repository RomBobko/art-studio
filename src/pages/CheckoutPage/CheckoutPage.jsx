import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./CheckoutPage.module.css";
import { useCart } from "../../context/CartContext";
import CheckoutEmptyState from "./components/CheckoutEmptyState";
import CheckoutSuccess from "./components/CheckoutSuccess";
import ShippingFields from "./components/ShippingFields";
import PaymentFields from "./components/PaymentFields";
import OrderSummary from "./components/OrderSummary";

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

            <CheckoutSuccess
              completedOrder={completedOrder}
              formatPrice={formatPrice}
            />
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

            <CheckoutEmptyState
              title="Your cart is empty"
              text="Add a few artworks before moving to checkout."
            />
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

                <ShippingFields
                  values={formik.values}
                  getFieldError={getFieldError}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                />
              </div>

              <PaymentFields
                values={formik.values}
                isCardPayment={isCardPayment}
                getFieldError={getFieldError}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                handlePaymentMethodChange={handlePaymentMethodChange}
              />

              <OrderSummary
                orderItems={orderItems}
                subtotal={subtotal}
                total={total}
                formatPrice={formatPrice}
              />
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
