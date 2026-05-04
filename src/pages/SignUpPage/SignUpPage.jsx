import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import logo from "../../assets/logo.svg";
import styles from "./SignUpPage.module.css";

const INITIAL_SIGN_UP_VALUES = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const signUpValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .required("Enter your name."),
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Enter your email address."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Enter your password."),
  confirmPassword: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords do not match."),
});

const SignUpPage = () => {
  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: INITIAL_SIGN_UP_VALUES,
    validationSchema: signUpValidationSchema,
    onSubmit: (values, formikHelpers) => {
      setSignUpSuccessMessage(
        "Account created locally. No real sign-up was performed.",
      );
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
    },
  });

  const nameError = formik.touched.name && formik.errors.name;
  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;
  const confirmPasswordError =
    formik.touched.confirmPassword && formik.errors.confirmPassword;

  const handleInputChange = (event) => {
    if (signUpSuccessMessage) {
      setSignUpSuccessMessage("");
    }

    formik.handleChange(event);
  };

  const handleFormSubmit = (event) => {
    if (signUpSuccessMessage) {
      setSignUpSuccessMessage("");
    }

    formik.handleSubmit(event);
  };

  return (
    <AuthLayout
      headingId="sign-up-page-title"
      title="Create your creative account"
      description="Keep your favorite pieces, continue checkout faster, and build your personal space inside ArtStudio."
    >
      <div className={styles.card}>
        <div className={styles.mainContent}>
          <div className={styles.brandBlock}>
            <Link className={styles.logoLink} to="/">
              <img className={styles.logo} src={logo} alt="ArtStudio" />
            </Link>
            <h2 className={styles.cardTitle}>Welcome to ArtStudio</h2>
          </div>

          <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-name">
                Name
              </label>
              <input
                className={`${styles.input} ${
                  nameError ? styles.inputError : ""
                }`}
                id="signup-name"
                name="name"
                type="text"
                placeholder="Name"
                value={formik.values.name}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "signup-name-error" : undefined}
              />
              {nameError && (
                <p className={styles.errorText} id="signup-name-error" role="alert">
                  {nameError}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-email">
                Email Address
              </label>
              <input
                className={`${styles.input} ${
                  emailError ? styles.inputError : ""
                }`}
                id="signup-email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? "signup-email-error" : undefined}
              />
              {emailError && (
                <p className={styles.errorText} id="signup-email-error" role="alert">
                  {emailError}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-password">
                Password
              </label>
              <input
                className={`${styles.input} ${
                  passwordError ? styles.inputError : ""
                }`}
                id="signup-password"
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
                aria-invalid={Boolean(passwordError)}
                aria-describedby={
                  passwordError ? "signup-password-error" : undefined
                }
              />
              {passwordError && (
                <p className={styles.errorText} id="signup-password-error" role="alert">
                  {passwordError}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-confirm-password">
                Confirm Password
              </label>
              <input
                className={`${styles.input} ${
                  confirmPasswordError ? styles.inputError : ""
                }`}
                id="signup-confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formik.values.confirmPassword}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
                aria-invalid={Boolean(confirmPasswordError)}
                aria-describedby={
                  confirmPasswordError ? "signup-confirm-password-error" : undefined
                }
              />
              {confirmPasswordError && (
                <p
                  className={styles.errorText}
                  id="signup-confirm-password-error"
                  role="alert"
                >
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              className={styles.primaryButton}
              type="submit"
              disabled={formik.isSubmitting}
            >
              Sign Up
            </button>

            {signUpSuccessMessage && (
              <p className={styles.successText} role="status" aria-live="polite">
                {signUpSuccessMessage}
              </p>
            )}
          </form>
        </div>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link className={styles.loginLink} to="/login">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
