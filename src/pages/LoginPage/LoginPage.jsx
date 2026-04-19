import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import logo from "../../assets/logo.svg";
import styles from "./LoginPage.module.css";

const socialProviders = [
  { id: "google", label: "Google", symbol: "G" },
  { id: "facebook", label: "Facebook", symbol: "f" },
  { id: "linkedin", label: "LinkedIn", symbol: "in" },
];

const INITIAL_LOGIN_VALUES = {
  email: "",
  password: "",
};

const validateLoginValues = (values) => {
  const nextErrors = {};
  const email = values.email.trim();
  const password = values.password.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    nextErrors.email = "Enter your email address.";
  } else if (!emailPattern.test(email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    nextErrors.password = "Enter your password.";
  }

  return nextErrors;
};

const LoginPage = () => {
  const [loginValues, setLoginValues] = useState(INITIAL_LOGIN_VALUES);
  const [loginErrors, setLoginErrors] = useState({});
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");

  const isSubmitDisabled =
    !loginValues.email.trim() || !loginValues.password.trim();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginValues((prevLoginValues) => ({
      ...prevLoginValues,
      [name]: value,
    }));

    if (loginErrors[name]) {
      setLoginErrors((prevLoginErrors) => ({
        ...prevLoginErrors,
        [name]: "",
      }));
    }

    if (loginSuccessMessage) {
      setLoginSuccessMessage("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateLoginValues(loginValues);

    if (Object.keys(nextErrors).length > 0) {
      setLoginErrors(nextErrors);
      setLoginSuccessMessage("");
      return;
    }

    setLoginErrors({});
    setLoginSuccessMessage(
      "Logged in locally. No real authentication was performed.",
    );
    setLoginValues(INITIAL_LOGIN_VALUES);
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

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-email">
                Email Address
              </label>
              <input
                className={`${styles.input} ${
                  loginErrors.email ? styles.inputError : ""
                }`}
                id="login-email"
                name="email"
                type="email"
                placeholder="Email"
                value={loginValues.email}
                onChange={handleChange}
                aria-invalid={Boolean(loginErrors.email)}
                aria-describedby={loginErrors.email ? "login-email-error" : undefined}
              />
              {loginErrors.email && (
                <p className={styles.errorText} id="login-email-error" role="alert">
                  {loginErrors.email}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-password">
                Password
              </label>
              <input
                className={`${styles.input} ${
                  loginErrors.password ? styles.inputError : ""
                }`}
                id="login-password"
                name="password"
                type="password"
                placeholder="Password"
                value={loginValues.password}
                onChange={handleChange}
                aria-invalid={Boolean(loginErrors.password)}
                aria-describedby={
                  loginErrors.password ? "login-password-error" : undefined
                }
              />
              {loginErrors.password && (
                <p
                  className={styles.errorText}
                  id="login-password-error"
                  role="alert"
                >
                  {loginErrors.password}
                </p>
              )}
            </div>

            <div className={styles.formActions}>
              <button className={styles.forgotLink} type="button">
                Forgot your password?
              </button>

              <button
                className={styles.primaryButton}
                type="submit"
                disabled={isSubmitDisabled}
              >
                Login
              </button>
            </div>

            {loginSuccessMessage && (
              <p className={styles.successText} aria-live="polite">
                {loginSuccessMessage}
              </p>
            )}
          </form>
        </div>

        <div className={styles.socialSection}>
          <p className={styles.socialLabel}>or sign in with</p>

          <div className={styles.socialButtons}>
            {socialProviders.map((provider) => (
              <button
                key={provider.id}
                className={styles.socialButton}
                type="button"
                aria-label={`Sign in with ${provider.label}`}
              >
                {provider.symbol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
