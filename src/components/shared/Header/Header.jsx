import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import {
  BsMoonStarsFill,
  BsSearch,
  BsSunFill,
  BsPersonFill,
  BsCartFill,
} from "react-icons/bs";
import Navigation from "../Navigation";
import Logo from "../Logo";
import { useCart } from "../../../context/CartContext";

const Header = ({ theme, onThemeToggle, onCartOpen }) => {
  const { itemCount } = useCart();
  const isDarkTheme = theme === "dark";

  return (
    <header className={styles.header}>
      <div className="container-main">
        <div className={styles.inner}>
          <Logo />

          <Navigation />

          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label={
                isDarkTheme
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              onClick={onThemeToggle}
            >
              {isDarkTheme ? (
                <BsSunFill className={styles.icon} />
              ) : (
                <BsMoonStarsFill className={styles.icon} />
              )}
            </button>
            <Link
              className={styles.iconBtn}
              to="/discover"
              aria-label="Browse artworks"
            >
              <BsSearch className={styles.icon} />
            </Link>
            <Link
              className={styles.iconBtn}
              to="/login"
              aria-label="Open login page"
            >
              <BsPersonFill className={styles.icon} />
            </Link>
            <button
              className={`${styles.iconBtn} ${styles.cartButton}`}
              type="button"
              aria-label={
                itemCount > 0
                  ? `Cart (${itemCount} item${itemCount === 1 ? "" : "s"})`
                  : "Cart"
              }
              onClick={onCartOpen}
            >
              <BsCartFill className={styles.icon} />
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
