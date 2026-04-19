import styles from "./AuthLayout.module.css";

const AuthLayout = ({ headingId, title, description, children }) => {
  return (
    <div className={styles.page}>
      <section className={styles.authSection} aria-labelledby={headingId}>
        <div className={styles.layout}>
          <div className={styles.promoPanel}>
            <h1 id={headingId} className={styles.title}>
              {title}
            </h1>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.contentPanel}>{children}</div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
