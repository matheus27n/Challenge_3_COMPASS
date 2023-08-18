import styles from "./Homepage.module.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Restaurante from "../../api/restaurantes/Restaurante.tsx";
import { useState } from "react";
import maca from "../../assets/img/Component 5.png";
import banana from "../../assets/img/Component 4.png";



function Homepage() {
  const apiUrl  = "https://parseapi.back4app.com/graphql";
  const [filtro, setFiltro] = useState("");

  return (
    <div className={styles.homepage}>
         <Header setFiltro={setFiltro} /> {/* Passe a função setFiltro como prop */}
      <div className={styles.homepage__content}>
          <div className={styles.homepage__title}>
            <h1>Premium <span>quality</span> Food for your<img src={banana}></img> <span>healthy <img src={maca}></img> & Daily Life</span></h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        <div className={styles.div_img}>
          <img className={styles.image_1} src="..\src\assets\img\Rectangle 1.png" alt='img1'></img>
          <img className={styles.image_2} src="..\src\assets\img\Rectangle 2.png" alt='img2'></img>
        </div>
      </div>
      {<h6>Restaurants</h6>}
       <Restaurante apiUrl={apiUrl} filtro={filtro} />
      <Footer />
    </div>
  );
}

export default Homepage;
