import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import logo from "../../assets/logo.svg";
import styles from "./SignUpPage.module.css";

const INITIAL_SIGN_UP_VALUES = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validateSignUpValues = (values) => {
  const nextErrors = {};
  const username = values.username.trim();
  const email = values.email.trim();
  const password = values.password.trim();
  const confirmPassword = values.confirmPassword.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username) {
    nextErrors.username = "Enter your username.";
  }

  if (!email) {
    nextErrors.email = "Enter your email address.";
  } else if (!emailPattern.test(email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    nextErrors.password = "Enter your password.";
  }

  if (!confirmPassword) {
    nextErrors.confirmPassword = "Confirm your password.";
  } else if (password && password !== confirmPassword) {
    nextErrors.confirmPassword = "Passwords do not match.";
  }

  return nextErrors;
};

const SignUpPage = () => {
  const [signUpValues, setSignUpValues] = useState(INITIAL_SIGN_UP_VALUES);
  const [signUpErrors, setSignUpErrors] = useState({});
  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("");

  const isSubmitDisabled =
    !signUpValues.username.trim() ||
    !signUpValues.email.trim() ||
    !signUpValues.password.trim() ||
    !signUpValues.confirmPassword.trim();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpValues((prevSignUpValues) => ({
      ...prevSignUpValues,
      [name]: value,
    }));

    if (signUpErrors[name]) {
      setSignUpErrors((prevSignUpErrors) => ({
        ...prevSignUpErrors,
        [name]: "",
      }));
    }

    if (signUpSuccessMessage) {
      setSignUpSuccessMessage("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateSignUpValues(signUpValues);

    if (Object.keys(nextErrors).length > 0) {
      setSignUpErrors(nextErrors);
      setSignUpSuccessMessage("");
      return;
    }

    setSignUpErrors({});
    setSignUpSuccessMessage(
      "Account created locally. No real sign-up was performed.",
    );
    setSignUpValues(INITIAL_SIGN_UP_VALUES);
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

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-username">
                Username
              </label>
              <input
                className={`${styles.input} ${
                  signUpErrors.username ? styles.inputError : ""
                }`}
                id="signup-username"
                name="username"
                type="text"
                placeholder="Username"
                value={signUpValues.username}
                onChange={handleChange}
                aria-invalid={Boolean(signUpErrors.username)}
                aria-describedby={
                  signUpErrors.username ? "signup-username-error" : undefined
                }
              />
              {signUpErrors.username && (
                <p className={styles.errorText} id="signup-username-error" role="alert">
                  {signUpErrors.username}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-email">
                Email Address
              </label>
              <input
                className={`${styles.input} ${
                  signUpErrors.email ? styles.inputError : ""
                }`}
                id="signup-email"
                name="email"
                type="email"
                placeholder="Email"
                value={signUpValues.email}
                onChange={handleChange}
                aria-invalid={Boolean(signUpErrors.email)}
                aria-describedby={
                  signUpErrors.email ? "signup-email-error" : undefined
                }
              />
              {signUpErrors.email && (
                <p className={styles.errorText} id="signup-email-error" role="alert">
                  {signUpErrors.email}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-password">
                Password
              </label>
              <input
                className={`${styles.input} ${
                  signUpErrors.password ? styles.inputError : ""
                }`}
                id="signup-password"
                name="password"
                type="password"
                placeholder="Password"
                value={signUpValues.password}
                onChange={handleChange}
                aria-invalid={Boolean(signUpErrors.password)}
                aria-describedby={
                  signUpErrors.password ? "signup-password-error" : undefined
                }
              />
              {signUpErrors.password && (
                <p className={styles.errorText} id="signup-password-error" role="alert">
                  {signUpErrors.password}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="signup-confirm-password">
                Confirm Password
              </label>
              <input
                className={`${styles.input} ${
                  signUpErrors.confirmPassword ? styles.inputError : ""
                }`}
                id="signup-confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={signUpValues.confirmPassword}
                onChange={handleChange}
                aria-invalid={Boolean(signUpErrors.confirmPassword)}
                aria-describedby={
                  signUpErrors.confirmPassword
                    ? "signup-confirm-password-error"
                    : undefined
                }
              />
              {signUpErrors.confirmPassword && (
                <p
                  className={styles.errorText}
                  id="signup-confirm-password-error"
                  role="alert"
                >
                  {signUpErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              className={styles.primaryButton}
              type="submit"
              disabled={isSubmitDisabled}
            >
              Sign Up
            </button>

            {signUpSuccessMessage && (
              <p className={styles.successText} aria-live="polite">
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
