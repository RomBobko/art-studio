import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import {
  BsSearch,
  BsPersonFill,
  BsHeartFill,
  BsCartFill,
} from "react-icons/bs";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link className={styles.brand} href="/">
            <img className={styles.logo} src={logo} alt="ArtStudio" />
            <span className={styles.brandText}>ArtStudio</span>
          </Link>

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
            <button className={styles.iconBtn} type="button" aria-label="Cart">
              <BsCartFill size={22} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
