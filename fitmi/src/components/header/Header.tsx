import styles from "../header/Header.module.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ setFiltro }: HeaderProps) {
  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
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
      <div className={styles.header__container}>
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
    </div>
  );
}

export default Header;
