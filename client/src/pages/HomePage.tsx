import React, { FC } from "react";
import { PizzaCards } from "../components/PizzaBlock/PizzaCard";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { useCustomSelector } from "../hooks/store";
import { selectAuthData, selectCurrentData } from "../redux/selectors";
import { useDispatch } from "react-redux";
import { fetchPizzas, } from "../redux/slices/pizzaSlice";

import { PizzaTypes } from "../types/types";
import { Pagination } from "../components/Pagination/Pagination";
import Skeleton from "../components/PizzaBlock/Skeleton";

export const HomePage: FC = () => {
    const pizzaState = useCustomSelector(selectCurrentData);
    const dispatch = useDispatch();

  

    React.useEffect(() => {
      dispatch(fetchPizzas())
      
      window.scrollTo(0, 0)
    }, [dispatch])
    
    return (
        <>
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                pizzaState.pizza.status === `loading` 
                ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) 
                : pizzaState.pizza.items.pizzas.map((data: PizzaTypes) => (
                  <PizzaCards data={data} key={data._id}/>))
              }
            </div>
            <Pagination/>
        </>
    )
}