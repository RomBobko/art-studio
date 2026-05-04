import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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
  const headerInnerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const isDarkTheme = theme === "dark";
  const mobileMenuId = "mobile-navigation";

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.classList.remove("mobile-menu-open");
      return;
    }

    document.body.classList.add("mobile-menu-open");
    menuButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !headerInnerRef.current) {
        return;
      }

      const focusableElements = [
        ...headerInnerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!headerInnerRef.current.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleCartOpen = () => {
    setIsMenuOpen(false);
    onCartOpen();
  };

  return (
    <header
      className={`${styles.header} ${isMenuOpen ? styles.headerMenuOpen : ""}`}
    >
      <div className="container-main">
        <div className={styles.inner} ref={headerInnerRef}>
          <div className={styles.logoArea}>
            <Logo onClick={() => setIsMenuOpen(false)} />
          </div>

          <Navigation className={styles.desktopNav} />

          <div
            className={`${styles.actions} ${
              isMenuOpen ? styles.actionsMenuOpen : ""
            }`}
          >
            <button
              className={`${styles.iconBtn} ${styles.menuButton}`}
              ref={menuButtonRef}
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
              className={`${styles.iconBtn} ${styles.mobileHiddenAction}`}
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
              className={`${styles.iconBtn} ${styles.searchLink} ${styles.mobileHiddenAction}`}
              to="/discover"
              aria-label="Browse artworks"
            >
              <BsSearch className={styles.icon} />
            </Link>
            <Link
              className={`${styles.iconBtn} ${styles.mobileHiddenAction}`}
              to="/login"
              aria-label="Open login page"
            >
              <BsPersonFill className={styles.icon} />
            </Link>
            <button
              className={`${styles.iconBtn} ${styles.cartButton} ${styles.mobileHiddenAction}`}
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

Header.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onThemeToggle: PropTypes.func.isRequired,
  onCartOpen: PropTypes.func.isRequired,
};

export default Header;
