import styles from "./Footer.module.css";
import logo from "../../../assets/logo.svg";
import {
  BsInstagram,
  BsPinterest,
  BsBehance,
  BsTwitterX,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* col 1 */}
          <div className={styles.brandCol}>
            <a className={styles.brand} href="#">
              <img className={styles.logo} src={logo} alt="ArtStudio" />
              <span className={styles.brandText}>ArtStudio</span>
            </a>

            <p className={styles.desc}>
              Discover unique art, create with passion, and share your world
              with Artora.
            </p>

            <div className={styles.contact}>
              <a href="mailto:info@artora.com">info@artora.com</a>
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
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Explore Art</a>
              </li>
              <li>
                <a href="#">Artists</a>
              </li>
              <li>
                <a href="#">Challenges</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
            </ul>
          </div>

          {/* col 3 */}
          <div className={styles.col}>
            <h3 className={styles.title}>Community</h3>
            <ul className={styles.list}>
              <li>
                <a href="#">Artora Blog</a>
              </li>
              <li>
                <a href="#">Explore Art</a>
              </li>
              <li>
                <a href="#">Join as an Artist</a>
              </li>
              <li>
                <a href="#">Events / Challenges</a>
              </li>
              <li>
                <a href="#">Newsletter Signup</a>
              </li>
            </ul>
          </div>

          {/* col 4 */}
          <div className={styles.col}>
            <h3 className={styles.title}>Support / Help</h3>
            <ul className={styles.list}>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>© 2025 Artora. All Rights Reserved.</div>
      </div>
    </footer>
  );
};


export default Footer;