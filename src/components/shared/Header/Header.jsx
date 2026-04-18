import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import {
  BsSearch,
  BsPersonFill,
  BsHeartFill,
  BsCartFill,
} from "react-icons/bs";
import Navigation from "../Navigation";
import Logo from "../Logo";

const Header = () => {
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
              <BsSearch size={22} />
            </button>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label="Account"
            >
              <BsPersonFill size={22} />
            </button>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label="Favorites"
            >
              <BsHeartFill size={22} />
            </button>
            <Link className={styles.iconBtn} to="/cart" aria-label="Cart">
              <BsCartFill size={22} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
