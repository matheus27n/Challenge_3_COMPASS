import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./ItensPage.module.css";
import axios from "axios";
import PratosPrincipais from "../../api/pratos/PratosPrincipais";
import porcetangem from '../../assets/img/Vector1.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ItensPage() {
  const restauranteApiUrl = "https://parseapi.back4app.com/graphql";
  const pratosApiUrl = "https://parseapi.back4app.com/graphql";
  const { restauranteId } = useParams();

  const [restaurante, setRestaurante] = useState({
    name: "",
    address: "",
    description: "",
    location: "", // Assuming this property is needed
    rating: "", // Assuming this property is needed
    deliveryTime: "", // Assuming this property is needed
  });

  const [pratosPrincipais, setPratosPrincipais] = useState([]);

  useEffect(() => {
    const fetchRestauranteData = async () => {
      try {
        const headers = {
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          restauranteApiUrl,
          {
            query: `
            query GetRestaurantById{
              fitMe(id: "${restauranteId}") {
                name
                location
                rating
                deliveryTime
              }
            }
          `,
            variables: {
              id: restauranteId,
            },
          },
          {
            headers,
          }
        );

        if (response.data.errors) {
          console.error("GraphQL error:", response.data.errors);
          return;
        }

        const restauranteData = response.data.data.fitMe;
        setRestaurante({
          name: restauranteData.name,
          location: restauranteData.location,
          rating: restauranteData.rating,
          deliveryTime: restauranteData.deliveryTime,
        });
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestauranteData();
  }, [restauranteId]);

  useEffect(() => {
    const fetchPratosPrincipais = async () => {
      try {
        const headers = {
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
          "Content-Type": "application/json",
        };

        const query = `
          query GetRestaurantById($restauranteId: ID!) {
            fitMe(id: $restauranteId) {
              topDishes {
                name
                price
                description
                image
              }
            }
          }
        `;

        const variables = {
          restauranteId: restauranteId,
        };

        const requestBody = {
          query: query,
          variables: variables,
        };

        const response = await axios.post(pratosApiUrl, requestBody, {
          headers,
        });

        if (response.data.errors) {
          console.error("GraphQL error:", response.data.errors);
          return;
        }

        const data = response.data.data.fitMe.topDishes;
        setPratosPrincipais(data.slice(0, 3)); // Get the first 3 pratos
      } catch (error) {
        console.error("Error fetching pratos data:", error);
      }
    };

    fetchPratosPrincipais();
  }, [pratosApiUrl, restauranteId]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: Math.max((cartItem.quantity || 1) - 1, 0) }
        : cartItem
    );

    setCartItems(updatedCart.filter((cartItem) => cartItem.quantity > 0));
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (acc, item) => {
        const itemTotalPrice = item.price * (item.quantity || 1);
        acc.totalPrice += itemTotalPrice;
        acc.totalQuantity += item.quantity || 1;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );

    return total;
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      toast.success("Checkout successful!", {
        position: "top-right",
        autoClose: 3000, // Duration for which the notification is displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Cart is empty. Add items to cart before checking out.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  return (
    <>
      <Header setFiltro={() => {}}/>
      <div className={styles.container}>
      <ToastContainer />
      <div className={styles.itens_page}>
        <div className={styles.itens_page_container}>
          <div className={styles.item_principal}>
            <img src="..\src\assets\img\Rectangle 28.png" alt="Restaurant" />
            <div className={styles.item_principal_info}>
              <h1>{restaurante.name}</h1>
              <p>{restaurante.location}</p>
            </div>
            <div className={styles.item_principal_info2}>
              <div className={styles.infos}>
                <p>Rating: {restaurante.rating}</p>
                <p>100+ ratings</p>
              </div>
              <div className={styles.infos_time}>
                <p>{restaurante.deliveryTime}</p>
                <p>Delivery Time</p>
              </div>
              <div className={styles.infos_price}>
                <p>₹200</p>
                <p>Cost for two</p>
              </div>
            </div>
            <div className={styles.ofeers}>
              <h1>Offeers</h1>
              <p><img src={porcetangem}></img>50% off up to ₹100 | Use code TRYNEW</p>
              <p><img src={porcetangem}></img>20% off | Use code PARTY</p>
            </div>
          </div>
        </div>
        <div className={styles.search}>
          <input type="Search" placeholder="Search for dish" />
          <button>Favorito</button>
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
              <PratosPrincipais
                apiUrl={pratosApiUrl}
                restauranteId={restauranteId}
                addToCart={addToCart}
              />
            </div>
          </div>
          <div className={styles.itens_page_dados_card_lateral}>
            <div className={styles.itens_page_dados_card_lateral_info}>
              <h1>Cart</h1>
              <h2>from {restaurante.name}</h2>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cart_item}>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <div className={styles.item_controls}>
                    <button onClick={() => removeFromCart(item)}>−</button>
                    <span className={styles.quantity_display}>
                      {item.quantity || 1}
                    </span>
                    <button
                      className={styles.plus_button}
                      onClick={() =>
                        addToCart({
                          ...item,
                          quantity: (item.quantity || 1) + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              {cartItems.length > 0 && (
                <div className={styles.cart_subtotal}>
                  <h2>Subtotal</h2>
                  <p>₹{calculateTotalPrice().totalPrice}</p>
                </div>
              )}
              <p>Total items: {calculateTotalPrice().totalQuantity}</p>
              <button className={styles.checkout_button} onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default ItensPage;
