import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/discover", label: "Discover" },
  { to: "/learn", label: "Learn" },
  { to: "/challenges", label: "Challenges" },
  { to: "/about", label: "About" },
];

const Navigation = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        {navItems.map(({ to, label, end }) => (
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
