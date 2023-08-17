import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function PratosPrincipais({ apiUrl, restauranteId }: PratosPrincipaisProps) {
  const [pratosPrincipais, setPratosPrincipais] = useState<PratoPrincipal[]>([]);

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
        console.error('Error fetching data:', error);
      });
  }, [apiUrl, restauranteId]);

  return (
    <div>
      {/*<h1>Pratos Principais</h1>*/}
      {pratosPrincipais.map((prato, index) => (
        <div key={index}>
          <h2>{prato.name}</h2>
          <p>Price: {prato.price}</p>
          <p>Description: {prato.description}</p>
          <img src={prato.image} alt={prato.name} />
        </div>
      ))}
    </div>
  );
}

export default PratosPrincipais;
