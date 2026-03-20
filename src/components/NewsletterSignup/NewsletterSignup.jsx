import styles from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>Stay Inspired, Stay Connected</h2>
        <p className={styles.text}>
          Get the latest art trends, tutorials, and featured works delivered
          straight to your inbox.
        </p>
        <form className={styles.form}>
          <input className={styles.input} type="text" placeholder="Email..." />
          <button className={styles.button} type="button" disabled>Subsctibe</button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup