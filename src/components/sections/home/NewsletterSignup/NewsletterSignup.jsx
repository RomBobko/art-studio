import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const validationToastId = "newsletter-validation-error";
  const submitToastId = "newsletter-submit-error";

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

    if (status === "success") {
      setStatus("idle");
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const trimmedEmail = email.trim();
    const validationError = validateEmail(trimmedEmail);

    if (validationError) {
      toast.error(validationError, {
        toastId: validationToastId,
      });
      return;
    }

    try {
      setStatus("submitting");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.", {
        toastId: submitToastId,
      });
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

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={status === "submitting"}
          >
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email..."
              aria-label="Email address"
              autoComplete="email"
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
