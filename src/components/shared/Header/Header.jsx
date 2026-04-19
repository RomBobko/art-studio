import styles from "./Header.module.css";
import {
  BsSearch,
  BsPersonFill,
  BsHeartFill,
  BsCartFill,
} from "react-icons/bs";
import Navigation from "../Navigation";
import Logo from "../Logo";
import { useCart } from "../../../context/CartContext";

const Header = ({ onCartOpen }) => {
  const { itemCount } = useCart();

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
              aria-label="Search"
            >
              <BsSearch className={styles.icon} />
            </button>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label="Account"
            >
              <BsPersonFill className={styles.icon} />
            </button>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label="Favorites"
            >
              <BsHeartFill className={styles.icon} />
            </button>
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
