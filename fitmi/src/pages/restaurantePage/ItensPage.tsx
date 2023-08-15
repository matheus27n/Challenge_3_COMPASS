import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PratosPrincipais from "../../api/pratos/PratosPrincipais"; // Importe o componente PratosPrincipais

function ItensPage() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedRestaurantPratos, setSelectedRestaurantPratos] = useState([]);

    const handleRestaurantClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setSelectedRestaurantPratos(restaurant.pratosPrincipais); // Use o array de pratos principais do restaurante selecionado
      };
      
  return (
    <>
      <Header />
      <div className="itens_page">
        <div className="itens_page_container">
          <div className="item_principal">
            <img></img>
            <div className="item_principal_info">
              <h1>Nome do item</h1>
              <p>Descrição do item</p>
              <p>Preço do item</p>
            </div>
            <div className="ofeers">
              <h1>Ofertas</h1>
              <p>50% off up to ₹100 | Use code TRYNEW</p>
              <p>20% off | Use code PARTY</p>
            </div>
          </div>
          <div className="Search">
            <input type="Search" placeholder="Search for dish"></input>
            <button>Favourite</button>
          </div>
        </div>
        <div className="itens_page_dados">
          <div className="itens_page_dados_ul">
            <ul>
              <li>Recommended</li>
              <li>Breakfast Box</li>
              <li>Lunch Box</li>
              <li>Combo Box</li>
              <li>Biriyani Box</li>
            </ul>
          </div>
          <div className="itens_page_dados_itens">
            <img></img>
            <h3>Brunch for 2 - Veg (Save upto Rs.45)</h3>
            <p>₹ 199</p>
            <h4>
              Brunch: One meal to rule them all! Grab this mega saver combo with
              your choice of 2 veg wraps, Aloo Paratha (2 pcs), chole and Curd
              lunchbox and 2 choco lava cakes. This is just bliss on a plate!
            </h4>
          </div>
          <div className="itens_page_dados_card_lateral">
            <img></img>
            <div className="itens_page_dados_card_lateral_info">
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
