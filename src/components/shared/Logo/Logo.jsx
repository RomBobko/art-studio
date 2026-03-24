import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link className={styles.brand} href="/">
      <img className={styles.logo} src={logo} alt="ArtStudio" />
      <span className={styles.brandText}>ArtStudio</span>
    </Link>
  );
};

export default Logo;