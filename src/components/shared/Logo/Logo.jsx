import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../../assets/logo.svg";
import styles from "./Logo.module.css";

const Logo = ({ onClick }) => {
  return (
    <Link className={styles.brand} to="/" onClick={onClick}>
      <img className={styles.logo} src={logo} alt="ArtStudio" />
      <span className={styles.brandText}>ArtStudio</span>
    </Link>
  );
};

Logo.propTypes = {
  onClick: PropTypes.func,
};

export default Logo;
