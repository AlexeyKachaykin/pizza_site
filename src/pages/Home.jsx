import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../components/Sort";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters
} from "../redax/slices/filterSlice";
import Pagination from "../components/Pagination";

import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import { fetchPizzas, selectPizzaData } from "../redax/slices/pizzaSlice";

const Home = () => {
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData); 
  const sortType = sort;
  

  
 

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  
  const getPizzas = async () => {
    
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue} ` : "";

 
   
      dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));
   
    window.scrollTo(0, 0);
  };
   React.useEffect(() => {
     if (isMounted.current) {
       const params = {
         categoryId: categoryId > 0 ? categoryId : null,
         sortProperty: sort.sortProperty,
         currentPage,
       };
       
       const queryString = qs.stringify(params, { skipNulls: true });
        
       navigate(`/?${queryString}`);  
     }
     if (!window.location.search) {
       fetchPizzas();
     }
     
    
  }, [categoryId, sort.sortProperty, currentPage]);



  React.useEffect(() => {
   
      getPizzas();
    
    
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

 
React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);
  const pizzas = items
    .filter((obj) => {
      if (obj.title.includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{status==='loading' ? sceletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
