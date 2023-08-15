import styles from "../header/Header.module.css";
import {Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container__logo}>
        <img
          className={styles.logo}
          src="..\src\assets\img\Logo.png"
          alt="logo"
        />
      </div>
      <div className={styles.header__container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter item or restaurant you are looking for"
        />
        <img
          className={styles.search__icon}
          src="..\src\assets\img\Bag.png"
          alt="search"
        />
        <Link to="/login">
        <button className={styles.search__button} type="submit">
          Sing in
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
