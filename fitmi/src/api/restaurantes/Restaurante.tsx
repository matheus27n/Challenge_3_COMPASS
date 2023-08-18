import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import estrela from '../../assets/img/Vector (2).png'
import emoji from '../../assets/img/Vector (3).png'

interface Restaurante {
  objectId: string;
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
  filtro: string;
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
          "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
          "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
          "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
          "Content-Type": "application/json",
        };

        const restauranteQuery = `
          query GetAllRestaurantes {
            fitMes {
              count
              edges {
                node {
                  objectId
                  name
                  rating
                  deliveryTime
                  image
                  topDishes{
                    ... AllDishes
                 }
                }
              }
            }
          }
          fragment AllDishes on Dish {
            name
            description
            image
            price
          }
        `;

        const response = await axios.post(
          apiUrl,
          {
            query: restauranteQuery,
          },
          { headers }
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setRestaurantes(response.data.data.fitMes.edges.map((edge: any) => edge.node));
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
                    <Link to={`/ItensPage/${restaurante.objectId}`}>
                      <img className={styles.img_card}src={restaurantImages[index]} alt={restaurante.name} />
                      <h2>{restaurante.name}</h2>
                      <p> <span className={styles.span}>sout indie</span><img src={estrela}></img> {restaurante.rating}</p>
                      <p className={styles.time}><img src={emoji}></img> {restaurante.deliveryTime}</p>
        
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
