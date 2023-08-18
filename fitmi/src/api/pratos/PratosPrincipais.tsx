import { useState, useEffect } from "react";
import styles from "../pratos/PratoPrincipais.module.css";
import axios from "axios";
import pratoImg1 from "../../assets/img/Rectangle 29.png";
import pratoImg2 from "../../assets/img/Rectangle 26 (1).png";
import pratoImg3 from "../../assets/img/Rectangle 26 (2).png";


// eslint-disable-next-line react-refresh/only-export-components
export function queryRestaurantById(id: string) {
  return (`query GetRestaurantById{
      fitMe(id: "${id}") {
        name
        image
        location
        rating
        deliveryTime
        topDishes {
          ...AllDishes
        }
      }
    }
    
    fragment AllDishes on Dish {
      name
      description
      image
      price
    }`);
}

interface PratoPrincipal {
  price: number;
  name: string;
  description: string;
  image: string;
}

interface PratosPrincipaisProps {
  apiUrl: string;
  restauranteId: string;
}

const pratoImages = [pratoImg1, pratoImg2, pratoImg3]; // Make sure to import these images

function PratosPrincipais({ apiUrl, restauranteId, addToCart }: PratosPrincipaisProps) {
  const [pratosPrincipais, setPratosPrincipais] = useState<PratoPrincipal[]>(
    []
  );

  useEffect(() => {
    const fetchPratosPrincipais = async () => {
      try {
        const headers = {
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
          "Content-Type": "application/json",
        };

        const query = queryRestaurantById(restauranteId);

        const variables = {
          id: restauranteId,
        };

        const requestBody = {
          query: query,
          variables: variables,
        };

        const response = await axios.post(apiUrl, requestBody, { headers });

        setPratosPrincipais(response.data.data.fitMe.topDishes);
      } catch (error) {
        console.error("Error fetching pratos principais:", error);
      }
    };

    fetchPratosPrincipais();
  }, [apiUrl, restauranteId]);

  return (
    <div className={styles.pratos_principais}>
      <div className={styles.pratos_principais__container}>
        {pratosPrincipais.slice(0, 3).map((prato, index) => ( // Display the first 3 dishes
          <div key={index}>
            <h2>{prato.name}</h2>
            <p>Price: {prato.price}</p>
            <h3><span>Description</span>: {prato.description}</h3>
            <img
              src={pratoImages[index % pratoImages.length]}
              alt={prato.name}
            />
            <button onClick={() => addToCart({ name: prato.name, price: prato.price })}>
              Add +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PratosPrincipais;