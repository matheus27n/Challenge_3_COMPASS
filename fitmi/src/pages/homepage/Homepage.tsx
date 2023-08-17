import styles from "./Homepage.module.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Restaurante from "../../api/restaurantes/Restaurante.tsx";
import { useState } from "react";
//import PratosPrincipais from "../../api/pratos/PratosPrincipais.tsx";


function Homepage() {
  const restauranteApiUrl  = "https://parseapi.back4app.com/classes/FitMe"; // Use a URL da API aqui
  //const pratosApiUrl  = "https://parseapi.back4app.com/classes/Dish"; 

  const [filtro, setFiltro] = useState("");

  return (
    <div className={styles.homepage}>
         <Header setFiltro={setFiltro} />{/* Passe a função setFiltro para o Header */}
      <div className={styles.homepage__content}>
          <div className={styles.homepage__title}>
            <h1>Premium quality Food for your healthy & Daily Life</h1>
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
      {<h1>Restaurantes</h1>}
      { <Restaurante apiUrl={restauranteApiUrl} filtro={filtro} /> }
      {/*<h1>Lista de Pratos Principais</h1>*/}
      {/*<PratosPrincipais apiUrl={pratosApiUrl}/>*/}
      <Footer />
    </div>
  );
}

export default Homepage;
