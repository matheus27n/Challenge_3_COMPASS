import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PratoPrincipal {
  price: number;
  name: string;
  description: string;
  image: string;
}

interface PratosPrincipaisProps {
  apiUrl: string;
}

function PratosPrincipais({ apiUrl }: PratosPrincipaisProps) {
  const [pratosPrincipais, setPratosPrincipais] = useState<PratoPrincipal[]>([]);

  useEffect(() => {
    const headers = {
      'X-Parse-Application-Id': 'lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh',
      'X-Parse-REST-API-Key': '8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08',
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        const data = response.data.results;
        setPratosPrincipais(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  return (
    <div>
      <h1>Pratos Principais</h1>
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
