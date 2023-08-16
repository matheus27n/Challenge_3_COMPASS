import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PratosPrincipais from "../../api/pratos/PratosPrincipais";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./ItensPage.module.css";

function ItensPage() {
    const pratosApiUrl = "https://parseapi.back4app.com/classes/Dish";
    const restauranteApiUrl = "https://parseapi.back4app.com/classes/FitMe";
  
    const { restauranteId } = useParams();
      
  return (
    <>
      <Header />
      <div className={styles.itens_page}>
        <div className={styles.itens_page_container}>
          <div className={styles.item_principal}>
            <img></img>
            <div className={styles.item_principal_info}>
              <h1>Nome do item</h1>
              <p>Descrição do item</p>
              <p>Preço do item</p>
            </div>
            <div className={styles.ofeers}>
              <h1>Ofertas</h1>
              <p>50% off up to ₹100 | Use code TRYNEW</p>
              <p>20% off | Use code PARTY</p>
            </div>
             {/* Renderize o componente PratosPrincipais com o ID do restaurante */}
             <PratosPrincipais apiUrl={pratosApiUrl} restauranteId={restauranteId} />      </div>
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
            <img></img>
            <h3>Brunch for 2 - Veg (Save upto Rs.45)</h3>
            <p>₹ 199</p>
            <h4>
              Brunch: One meal to rule them all! Grab this mega saver combo with
              your choice of 2 veg wraps, Aloo Paratha (2 pcs), chole and Curd
              lunchbox and 2 choco lava cakes. This is just bliss on a plate!
            </h4>
          </div>
          <div className={styles.itens_page_dados_card_lateral}>
            <img></img>
            <div className={styles.itens_page_dados_card_lateral_info}>
              <h1>Cart</h1>
              <h2>from Lunch Box</h2>
              <h5>Brunch for 2 - Veg (Save upto Rs.45)</h5>
              <p>₹ 199</p>

              <h2>from Fasso</h2>
              <h5>Brunch for 2 - Veg (Save upto Rs.45)</h5>
              <p>₹ 199</p>

              <h1>Subtotal</h1>
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
