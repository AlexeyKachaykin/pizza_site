import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63236406bb2321cba919074a.mockapi.io/items/" + id
        );

        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);
  if (!pizza) {
    return <>"Загрузка...."</>
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="img" />
      <h2>{pizza.title}</h2>

      <h4> {pizza.price}₴</h4>
    </div>
  );
};

export default FullPizza;