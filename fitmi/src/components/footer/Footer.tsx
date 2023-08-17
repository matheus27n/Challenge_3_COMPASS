import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
      <Link to="/">
        <div className={styles.footer__container__logo}>
          <img
            className={styles.logo}
            src="..\src\assets\img\Frame 37.png"
            alt="logo"
          />
        </div>
        </Link>
        <div className={styles.footer__container__links}>
          <ul className={styles.footer__container__links__list}>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Help & Support</li>
            <li>T&C</li>
          </ul>
        <div className={styles.icons}>
          <img
            className={styles.facebook}
            src="..\src\assets\img\facebook icon.png"
            alt="facebook"
          />
          <img
            className={styles.instagram}
            src="..\src\assets\img\Vector (1).png"
            alt="instagram"
          />
          <img
            className={styles.twitter}
            src="..\src\assets\img\twitter icon.png"
            alt="twitter"
          />
          </div>
        </div>
        <div className={styles.footer__contato}>
          <h3>Contact: +91 123456789</h3>
        </div>
      </div>
    </div>
  );
}

export default Footer;
