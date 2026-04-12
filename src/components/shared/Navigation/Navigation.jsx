import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { primarySiteLinks } from "../../../data/siteLinks";

const Navigation = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        {primarySiteLinks.map(({ to, label, end }) => (
          <li key={label}>
            <NavLink
              to={to}
              end={end}
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

export default Navigation;
