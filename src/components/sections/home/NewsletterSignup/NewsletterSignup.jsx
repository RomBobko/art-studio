import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState("idle");
  const validationToastId = "newsletter-validation-error";

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
    setEmailError("");

    if (status === "success") {
      setStatus("idle");
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const trimmedEmail = email.trim();
    const validationError = validateEmail(trimmedEmail);

    if (validationError) {
      setEmailError(validationError);
      toast.error(validationError, {
        toastId: validationToastId,
      });
      return;
    }

    setStatus("success");
    setEmailError("");
    setEmail("");
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

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email..."
              aria-label="Email address"
              aria-invalid={Boolean(emailError)}
              aria-describedby={
                emailError ? "newsletter-email-error" : undefined
              }
              autoComplete="email"
              value={email}
              onChange={handleChange}
            />

            <button
              className={styles.button}
              type="submit"
              disabled={!email.trim()}
            >
              Subscribe
            </button>
          </form>

          {emailError && (
            <p
              className={styles.errorMessage}
              id="newsletter-email-error"
              role="alert"
            >
              {emailError}
            </p>
          )}

          {status === "success" && (
            <p
              className={styles.successMessage}
              role="status"
              aria-live="polite"
            >
              Thank you for subscribing.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
