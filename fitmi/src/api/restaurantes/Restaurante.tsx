import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Certifique-se de importar o Link
import axios from "axios";
import styles from "./Restaurante.module.css";
import restaurantImage1 from "../../assets/img/Rectangle 26 (1).png";
import restaurantImage2 from "../../assets/img/Rectangle 26 (2).png";
import restaurantImage3 from "../../assets/img/Rectangle 26 (3).png";
import restaurantImage4 from "../../assets/img/Rectangle 26 (4).png";
import restaurantImage5 from "../../assets/img/Rectangle 26 (5).png";
import restaurantImage6 from "../../assets/img/Rectangle 26 (6).png";
import restaurantImage7 from "../../assets/img/Rectangle 26 (7).png";
import restaurantImage8 from "../../assets/img/Rectangle 26.png";

interface Restaurante {
  objectId: string; // Adicione a propriedade objectId
  name: string;
  rating: number;
  deliveryTime: string;
  isExpensive: boolean;
  location: string;
  image: string;
  topDishes: string[];
}

interface RestauranteProps {
  apiUrl: string;
  filtro: string; // Adicione a propriedade filtro
}

const restaurantImages = [
  restaurantImage1,
  restaurantImage2,
  restaurantImage3,
  restaurantImage4,
  restaurantImage5,
  restaurantImage6,
  restaurantImage7,
  restaurantImage8,
];

function Restaurante({ apiUrl, filtro }: RestauranteProps) {
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

  const restaurantesFiltrados = filtro
    ? restaurantes.filter((restaurante) =>
        restaurante.name.toLowerCase().includes(filtro.toLowerCase())
      )
    : restaurantes;

  return (
    <div className={styles.Restaurantes_pratos}>
      <div className={styles.Restaurantes_pratos_title}>
        {[...Array(Math.ceil(restaurantesFiltrados.length / itemsPerRow))].map(
          (_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {restaurantesFiltrados
                .slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
                .map((restaurante, index) => (
                  <div key={index} className={styles.item}>
                    {/* Use o objectId como parâmetro na URL do Link */}
                    <Link to={`/ItensPage/${restaurante.objectId}`}>
                      <img src={restaurantImages[index]} alt={restaurante.name} />
                      <h2>{restaurante.name}</h2>
                      <p>Location: {restaurante.location}</p>
                      <p>Rating: {restaurante.rating}</p>
                      <p>Delivery Time: {restaurante.deliveryTime}</p>
                      <p>Expensive: {restaurante.isExpensive ? "Yes" : "No"}</p>
                    </Link>
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
