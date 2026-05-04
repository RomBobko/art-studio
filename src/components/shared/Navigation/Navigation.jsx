import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navigation.module.css";
import { primarySiteLinks } from "../../../data/siteLinks";

const Navigation = ({ variant = "desktop", className = "", onLinkClick }) => {
  const navClassName = [
    styles.nav,
    variant === "mobile" ? styles.mobileNav : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClassName} aria-label="Primary">
      <ul className={styles.navList}>
        {primarySiteLinks.map(({ to, label, end }) => (
          <li key={label} className={styles.navItem}>
            <NavLink
              to={to}
              end={end}
              onClick={onLinkClick}
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  variant: PropTypes.oneOf(["desktop", "mobile"]),
  className: PropTypes.string,
  onLinkClick: PropTypes.func,
};

export default Navigation;
