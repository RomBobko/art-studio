import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import logo from "../../assets/logo.svg";
import styles from "./LoginPage.module.css";

const INITIAL_LOGIN_VALUES = {
  email: "",
  password: "",
};

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Enter your email address."),
  password: Yup.string().required("Enter your password."),
});

const LoginPage = () => {
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: INITIAL_LOGIN_VALUES,
    validationSchema: loginValidationSchema,
    onSubmit: (values, formikHelpers) => {
      setLoginSuccessMessage(
        "Logged in locally. No real authentication was performed.",
      );
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
    },
  });

  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;

  const handleInputChange = (event) => {
    if (loginSuccessMessage) {
      setLoginSuccessMessage("");
    }

    formik.handleChange(event);
  };

  const handleFormSubmit = (event) => {
    if (loginSuccessMessage) {
      setLoginSuccessMessage("");
    }

    formik.handleSubmit(event);
  };

  return (
    <AuthLayout
      headingId="login-page-title"
      title="Login to get more ideas"
      description="Save favorite artworks, continue your checkout, and return to your creative space any time."
    >
      <div className={styles.card}>
        <Link className={styles.signUpButton} to="/signup">
          Sign Up
        </Link>

        <div className={styles.mainContent}>
          <div className={styles.brandBlock}>
            <Link className={styles.logoLink} to="/">
              <img className={styles.logo} src={logo} alt="ArtStudio" />
            </Link>
            <h2 className={styles.cardTitle}>Welcome to ArtStudio</h2>
          </div>

          <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-email">
                Email Address
              </label>
              <input
                className={`${styles.input} ${
                  emailError ? styles.inputError : ""
                }`}
                id="login-email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? "login-email-error" : undefined}
              />
              {emailError && (
                <p className={styles.errorText} id="login-email-error" role="alert">
                  {emailError}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-password">
                Password
              </label>
              <input
                className={`${styles.input} ${
                  passwordError ? styles.inputError : ""
                }`}
                id="login-password"
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                aria-invalid={Boolean(passwordError)}
                aria-describedby={
                  passwordError ? "login-password-error" : undefined
                }
              />
              {passwordError && (
                <p
                  className={styles.errorText}
                  id="login-password-error"
                  role="alert"
                >
                  {passwordError}
                </p>
              )}
            </div>

            <div className={styles.formActions}>
              <a
                className={styles.forgotLink}
                href="mailto:info@artstudio.com?subject=Sign-in%20Help"
              >
                Need help signing in?
              </a>

              <button
                className={styles.primaryButton}
                type="submit"
                disabled={formik.isSubmitting}
              >
                Login
              </button>
            </div>

            {loginSuccessMessage && (
              <p className={styles.successText} role="status" aria-live="polite">
                {loginSuccessMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
