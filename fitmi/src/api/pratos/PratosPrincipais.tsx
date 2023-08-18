import React, { useState, useEffect } from "react";
import styles from "../pratos/PratoPrincipais.module.css";
import axios from "axios";
import pratoImg1 from "../../assets/img/Rectangle 29.png";
import pratoImg2 from "../../assets/img/Rectangle 26 (1).png";
import pratoImg3 from "../../assets/img/Rectangle 26 (2).png";

interface PratoPrincipal {
  price: number;
  name: string;
  description: string;
  image: string;
  restauranteId: string; // Certifique-se de adicionar essa propriedade
}

interface PratosPrincipaisProps {
  apiUrl: string;
  restauranteId: string; // ID do restaurante para filtragem
}

const pratoImages = [pratoImg1, pratoImg2, pratoImg3];

function PratosPrincipais({ apiUrl, restauranteId }: PratosPrincipaisProps) {
  const [pratosPrincipais, setPratosPrincipais] = useState<PratoPrincipal[]>(
    []
  );

  useEffect(() => {
    const headers = {
      "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
      "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
      "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
      "Content-Type": "application/json",
    };

    const queryParams = {
      where: JSON.stringify({ restauranteId }), // Filtra por restauranteId
    };

    axios
      .get(apiUrl, { headers, params: queryParams })
      .then((response) => {
        const data = response.data.results;
        setPratosPrincipais(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl, restauranteId]);

  return (
    <div className={styles.pratos_principais}>
      <div className={styles.pratos_principais__container}>
        {pratosPrincipais.map((prato, index) => (
            <div key={index}>
              <h2>{prato.name}</h2>
              <p>Price: {prato.price}</p>
              <h3>Description: {prato.description}</h3>
              <img
                src={pratoImages[index % pratoImages.length]}
                alt={prato.name}
              />
              <button>Add +</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PratosPrincipais;
