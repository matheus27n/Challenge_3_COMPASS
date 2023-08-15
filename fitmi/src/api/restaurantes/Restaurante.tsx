import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Restaurante.module.css";

interface Restaurante {
  name: string;
  rating: number;
  deliveryTime: string;
  isExpensive: boolean;
  location: string;
  image: string;
  topDishes: string[]; // Atualize o tipo do topDishes para string[]
}

interface RestauranteProps {
  apiUrl: string;
}

function Restaurante({ apiUrl }: RestauranteProps) {
  const itemsPerRow = 4;

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const headers = {
          "X-Parse-Application-Id": "lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh",
          "X-Parse-REST-API-Key": "8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08",
          "Content-Type": "application/json",
        };

        const response = await axios.get(apiUrl, { headers });
        setRestaurantes(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchRestaurantes();
  }, [apiUrl]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.Restaurantes_pratos}>
      <div className={styles.Restaurantes_pratos_title}>
        {[...Array(Math.ceil(restaurantes.length / itemsPerRow))].map(
          (_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {restaurantes
                .slice(
                  rowIndex * itemsPerRow,
                  (rowIndex + 1) * itemsPerRow
                )
                .map((restaurante, index) => (
                  <div key={index} className={styles.item}>
                    <h2>{restaurante.name}</h2>
                    <p>Rating: {restaurante.rating}</p>
                    <p>Delivery Time: {restaurante.deliveryTime}</p>
                    <p>Expensive: {restaurante.isExpensive ? "Yes" : "No"}</p>
                    <p>Location: {restaurante.location}</p>
                    <p>Top Dishes: {restaurante.topDishes ? restaurante.topDishes.join(", ") : "No top dishes"}</p>
                    <img src={restaurante.image} alt={restaurante.name} />
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Restaurante;
