import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
      <img className="container__img" src={pizza.imageUrl} alt="img" />
      <h2>{pizza.title}</h2>

      <h4> {pizza.price}₴</h4>
     <Link to={"/"}>
      <button
        className="button button--outline button--add">
        <span>Назад</span>
      </button></Link>

    </div>
  );
};

export default FullPizza;
