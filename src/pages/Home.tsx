import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import qs from 'qs';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setSort, setCategoryId, setFilters, selectFilters } from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  // const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categoryId, sortObj, searchValue } = useSelector(selectFilters);
  const { items, status } = useSelector((state: any) => state.pizzas);

  const skelleton = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzasItems = items.map((pizza :any) => (    
      <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const getPizzas = async () => {
    const categoryQwParams = categoryId > 0 ? `category=${categoryId}` : '';
    const sortQwParams = `&sortby=${sortObj.sortProperty.replace('-', '')}&order=${
      sortObj.sortProperty.includes('-') ? 'asc' : 'desc'
    }`;
    const searchQwParams = `&search=${searchValue}`;

    dispatch(
      fetchPizza({
        categoryQwParams,
        sortQwParams,
        searchQwParams,
      }),
    );
  };

  

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortObj.sortProperty,
  //       categoryId,
  //     });

  //     navigate(`/?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortObj.sortProperty]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
  //     if (sort) {
  //       params.sort = sort;
  //     }
  //     dispatch(setFilters(params));
  //     isSearch.current = true;
  //   }
  // }, []);

  React.useEffect(() => {
    // if (!isSearch.current) {
    //   getPizzas();
    // }

    // isSearch.current = false;
    getPizzas();
  }, [categoryId, sortObj.sortProperty, searchValue]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skelleton : pizzasItems}</div>
      )}
    </>
  );
};

export default Home;
