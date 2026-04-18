import styles from "./Header.module.css";
import Navigation from "../Navigation";
import Logo from "../Logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container-main">
        <div className={styles.inner}>
          <Logo />

          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
