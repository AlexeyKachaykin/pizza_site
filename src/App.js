import React from 'react'
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import Skeleton from "./components/PizzaBlock/skeleton";
import "./scss/app.scss";
function App() {
  const [isLoading, setIsLoading] = React.useState(true);   
  const [items, setItems] = React.useState([]);
 React.useEffect(() => {
 fetch("https://63236406bb2321cba919074a.mockapi.io/items")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
       setIsLoading(false);
      });
  
 }, []);
   
  
  return (
    <div className="wrapper">
     
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading ? [... new Array(6)].map((_, index) => <Skeleton key={index } />) : items.map((obj,i) => 
             <PizzaBlock key={i} {...obj} />)}
              

             
          </div>
        </div>
      </div>
    </div>
  );
} 
export default App;
