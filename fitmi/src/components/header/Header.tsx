import React, { useState } from "react";
import styles from "../header/Header.module.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ setFiltro }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value); // Atualize o filtro com o valor do input
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.header__container__logo}>
          <img
            className={styles.logo}
            src="..\src\assets\img\Logo.png"
            alt="logo"
          />
        </div>
      </Link>
      <div className={`${styles.header__container} ${menuOpen ? styles.menu_open : ''}`}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter item or restaurant you are looking for"
          onChange={handleFiltroChange}
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
      <div className={styles.menu_hamburguer} onClick={toggleMenu}>
        <img src="..\src\assets\img\menu-hamburguer.png" alt="menu" />
      </div>
      {menuOpen && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}
    </div>
  );
}

export default Header;
