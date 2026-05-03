import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import {
  BsList,
  BsMoonStarsFill,
  BsSearch,
  BsSunFill,
  BsX,
  BsPersonFill,
  BsCartFill,
} from "react-icons/bs";
import Navigation from "../Navigation";
import Logo from "../Logo";
import { useCart } from "../../../context/CartContext";

const Header = ({ theme, onThemeToggle, onCartOpen }) => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDarkTheme = theme === "dark";
  const mobileMenuId = "mobile-navigation";

  const handleCartOpen = () => {
    setIsMenuOpen(false);
    onCartOpen();
  };

  return (
    <header className={styles.header}>
      <div className="container-main">
        <div className={styles.inner}>
          <Logo />

          <Navigation className={styles.desktopNav} />

          <div className={styles.actions}>
            <button
              className={`${styles.iconBtn} ${styles.menuButton}`}
              type="button"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls={mobileMenuId}
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            >
              {isMenuOpen ? (
                <BsX className={styles.menuIcon} />
              ) : (
                <BsList className={styles.menuIcon} />
              )}
            </button>
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
              className={`${styles.iconBtn} ${styles.searchLink}`}
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
              onClick={handleCartOpen}
            >
              <BsCartFill className={styles.icon} />
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          <div
            id={mobileMenuId}
            className={`${styles.mobileNavPanel} ${
              isMenuOpen ? styles.mobileNavPanelOpen : ""
            }`}
          >
            <Navigation
              variant="mobile"
              onLinkClick={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
