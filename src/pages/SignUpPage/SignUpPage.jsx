import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import logo from "../../assets/logo.svg";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <AuthLayout
      headingId="sign-up-page-title"
      eyebrow="Sign Up"
      title="Create your creative account"
      description="Keep your favorite pieces, continue checkout faster, and build your personal space inside ArtStudio."
    >
      <div className={styles.card}>
        <div className={styles.brandBlock}>
          <Link className={styles.logoLink} to="/">
            <img className={styles.logo} src={logo} alt="ArtStudio" />
          </Link>
          <h2 className={styles.cardTitle}>Welcome to ArtStudio</h2>
        </div>

        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-username">
              Username
            </label>
            <input
              className={styles.input}
              id="signup-username"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-email">
              Email Address
            </label>
            <input
              className={styles.input}
              id="signup-email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-password">
              Password
            </label>
            <input
              className={styles.input}
              id="signup-password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="signup-confirm-password">
              Confirm Password
            </label>
            <input
              className={styles.input}
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <button className={styles.primaryButton} type="button">
            Sign Up
          </button>
        </form>

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
