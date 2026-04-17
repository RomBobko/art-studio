import { useState } from "react";
import styles from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Please enter your email.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedValue)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleChange = (evt) => {
    setEmail(evt.target.value);

    if (status === "success" || status === "error") {
      setStatus("idle");
      setError("");
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const trimmedEmail = email.trim();
    const validationError = validateEmail(trimmedEmail);

    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }

    try {
      setStatus("submitting");

      // Тут пізніше буде реальний запит на сервер
      console.log("Submitted email:", trimmedEmail);

      setStatus("success");
      setError("");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className={styles.section}>
      <div className="container-wide">
        <div className={styles.inner}>
          <h2 className={styles.title}>Stay Inspired, Stay Connected</h2>
          <p className={styles.text}>
            Get the latest art trends, tutorials, and featured works delivered
            straight to your inbox.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email..."
              aria-label="Email address"
              value={email}
              onChange={handleChange}
            />

            <button
              className={styles.button}
              type="submit"
              disabled={!email.trim() || status === "submitting"}
            >
              {status === "submitting" ? "Submitting..." : "Subscribe"}
            </button>
          </form>

          {status === "error" && (
            <p className={styles.errorMessage} role="alert">
              {error}
            </p>
          )}

          {status === "success" && (
            <p className={styles.successMessage} aria-live="polite">
              Thank you for subscribing.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
