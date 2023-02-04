import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PizzaDetail: React.FC = () => {
  const [pizza, setPizza] = useState<{imageUrl: string,title: string, price: number}>();
  const { id } = useParams();

  useEffect(() => {
    async function getPizzaDetailInfo() {
      try {
        const { data } = await axios.get('https://63305878591935f3c88e2d7a.mockapi.io/items/' + id);
        setPizza(data);
      } catch {
        console.log('ERROR при получении данных пиццы');
      }
    }
    getPizzaDetailInfo();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <p>{pizza.title}</p>
      <p>{pizza.price} P</p>
    </div>
  );
};

export default PizzaDetail;
