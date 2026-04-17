import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../../assets/logo.svg";
import { primarySiteLinks } from "../../../data/siteLinks";
import {
  BsInstagram,
  BsPinterest,
  BsBehance,
  BsTwitterX,
} from "react-icons/bs";

const communityLinks = [
  { to: "/discover", label: "Explore Art" },
  { to: "/discover", label: "Meet Artists" },
  { to: "/learn", label: "Learn Skills" },
  { to: "/challenges", label: "Join Challenges" },
];

const supportLinks = [
  { href: "mailto:info@artstudio.com", label: "Email Us" },
  { href: "tel:+15551234567", label: "Call Us" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-main">
        <div className={styles.top}>
          {/* col 1 */}
          <div className={styles.brandCol}>
            <Link className={styles.brand} to="/">
              <img className={styles.logo} src={logo} alt="ArtStudio" />
              <span className={styles.brandText}>ArtStudio</span>
            </Link>

            <p className={styles.desc}>
              Discover unique art, create with passion, and share your world
              with ArtStudio.
            </p>

            <div className={styles.contact}>
              <a href="mailto:info@artstudio.com">info@artstudio.com</a>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </div>

            <div className={styles.social}>
              <a className={styles.socialBtn} href="#" aria-label="Instagram">
                <BsInstagram size={18} />
              </a>
              <a className={styles.socialBtn} href="#" aria-label="Pinterest">
                <BsPinterest size={18} />
              </a>
              <a className={styles.socialBtn} href="#" aria-label="Behance">
                <BsBehance size={18} />
              </a>
              <a className={styles.socialBtn} href="#" aria-label="X">
                <BsTwitterX size={18} />
              </a>
            </div>
          </div>

          {/* col 2 */}
          <div className={styles.col}>
            <h3 className={styles.title}>Quick Links</h3>
            <ul className={styles.list}>
              {primarySiteLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 3 */}
          <div className={styles.col}>
            <h3 className={styles.title}>Community</h3>
            <ul className={styles.list}>
              {communityLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 4 */}
          <div className={styles.col}>
            <h3 className={styles.title}>Support / Help</h3>
            <ul className={styles.list}>
              {supportLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          &copy; 2025 ArtStudio. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
