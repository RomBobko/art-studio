import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import logo from "../../assets/logo.svg";
import styles from "./LoginPage.module.css";

const socialProviders = [
  { id: "google", label: "Google", symbol: "G" },
  { id: "facebook", label: "Facebook", symbol: "f" },
  { id: "linkedin", label: "LinkedIn", symbol: "in" },
];

const LoginPage = () => {
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

          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-email">
                Email Address
              </label>
              <input
                className={styles.input}
                id="login-email"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="login-password">
                Password
              </label>
              <input
                className={styles.input}
                id="login-password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className={styles.formActions}>
              <button className={styles.forgotLink} type="button">
                Forgot your password?
              </button>

              <button className={styles.primaryButton} type="button">
                Login
              </button>
            </div>
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
