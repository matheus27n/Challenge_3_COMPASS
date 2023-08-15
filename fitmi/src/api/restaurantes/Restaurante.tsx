import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Restaurante {
  name: string;
  rating: number;
  deliveryTime: string;
  isExpensive: boolean;
  location: string;
  image: string;
  topDishes: Array<any>; // O tipo exato do topDishes depende da estrutura da API
}

interface RestauranteProps {
  apiUrl: string;
}

function Restaurante({ apiUrl }: RestauranteProps) {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    const headers = {
      'X-Parse-Application-Id': 'lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh',
      'X-Parse-REST-API-Key': '8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08',
      'Content-Type': 'application/json',
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        const data = response.data.results;
        setRestaurantes(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  return (
    <div>
      {restaurantes.map((restaurante, index) => (
        <div key={index}>
          <h2>{restaurante.name}</h2>
          <p>Rating: {restaurante.rating}</p>
          <p>Delivery Time: {restaurante.deliveryTime}</p>
          <p>Expensive: {restaurante.isExpensive ? 'Yes' : 'No'}</p>
          <p>Location: {restaurante.location}</p>
          <p>Top Dishes: {restaurante.topDishes.join(', ')}</p>
          <img src={restaurante.image} alt={restaurante.name} />
        </div>
      ))}
    </div>
  );
}

export default Restaurante;
