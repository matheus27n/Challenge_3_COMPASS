import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importe o hook useParams
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./ItensPage.module.css";
import PratosPrincipais from "../../api/pratos/PratosPrincipais";
import axios from "axios";

function ItensPage() {
  const restauranteApiUrl = "https://parseapi.back4app.com/classes/FitMe";
  const pratosApiUrl = "https://parseapi.back4app.com/classes/Dish";
  
  const { restauranteId } = useParams(); // Obtenha o ID do restaurante da URL

  const [restaurante, setRestaurante] = useState({
    name: "",
    address: "",
    description: "",
    pratos: [],
  });

  useEffect(() => {
    const fetchRestauranteData = async () => {
      try {
        const headers = {
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
          "Content-Type": "application/json",
        };

        const response = await axios.get(`${restauranteApiUrl}/${restauranteId}`, {
          headers,
        });

        setRestaurante(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestauranteData();
  }, [restauranteId]); // Certifique-se de incluir restauranteId como dependência


  return (
    <>
      <Header setFiltro={() => {}} />
      <div className={styles.itens_page}>
        <div className={styles.itens_page_container}>
          <div className={styles.item_principal}>
            <img src="..\src\assets\img\Rectangle 28.png"></img>
            <div className={styles.item_principal_info}>
            <h1>{restaurante.name}</h1>
            </div>
            <div className={styles.infos}>
              <p>{restaurante.location}</p>
              <p>Rating: {restaurante.rating}</p>
              <p>Delivery Time: {restaurante.deliveryTime}</p>
            </div>
            <div className={styles.ofeers}>
              <h1>Offeers</h1>
              <p>50% off up to ₹100 | Use code TRYNEW</p>
              <p>20% off | Use code PARTY</p>
            </div>
          </div>
          <div className={styles.search}>
            <input type="Search" placeholder="Search for dish"></input>
            <button>Favourite</button>
          </div>
        </div>
        <div className={styles.itens_page_dados}>
          <div className={styles.itens_page_dados_ul}>
            <ul>
              <li>Recommended</li>
              <li>Breakfast Box</li>
              <li>Lunch Box</li>
              <li>Combo Box</li>
              <li>Biriyani Box</li>
            </ul>
          </div>
          <div className={styles.itens_page_dados_itens}>
            <div className={styles.itens_subpage}>
              <h1>nome</h1>
              <p>preço</p>
              <p>descrição</p>
            </div>
              <img src="..\src\assets\img\Rectangle 28.png"></img>
              <button>Add +</button>
          </div>
          <div className={styles.itens_page_dados_card_lateral}>
            <img></img>
            <div className={styles.itens_page_dados_card_lateral_info}>
              <h1>Cart</h1>
              <h2>from NAME DO RESTAURANTE</h2>
              <h5>NOME DO PRATO</h5>
              <p>PREÇO DO PRATO</p>

              <h2>from NAME DE OUTRO SE TIVER RESTAURANTE</h2>
              <h5>NOME DO PRATO</h5>
              <p>PREÇO DO PRATO</p>

              <h1>Subtotal + PREÇO TOTAL DAS COMPRAS DOS PRATOS</h1>
              <p>Extra charges may apply</p>

              <button>Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ItensPage;
