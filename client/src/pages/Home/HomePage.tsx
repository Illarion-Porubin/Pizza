import React from "react";
import { PizzasComp } from "../../components/Pizzas/PizzasComp";
import { Categories } from "../../components/Categories/CategoriesComp";
import { Sort } from "../../components/Sort/SortComp";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectCurrentData } from "../../redux/selectors";
// import { useDispatch } from "react-redux";
import { fetchPizzas, PizzaState } from "../../redux/slices/pizzaSlice";
import { PizzaTypes } from "../../types/types";
import { Pagination } from "../../components/Pagination/PaginationComp";
import Skeleton from "../../components/Pizzas/Skeleton";
import s from "./HomePage.module.scss";


export const HomePage: React.FC = () => {
  const pizzaState = useCustomSelector<PizzaState>(selectCurrentData);
  const dispatch = useCustomDispatch();

  React.useEffect(() => {
    dispatch<PizzaState>(fetchPizzas());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <>
      <div className={s.content__top}>
        <Categories />
        <Sort />
      </div>
      <h2 className={s.content__title}>Все пиццы</h2>
      <div className={s.content__items}>
        {pizzaState.pizza.status === `loading`
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzaState.pizza.items.pizzas.map((data: PizzaTypes) => (
              <PizzasComp data={data} key={data.name} />
            ))}
      </div>
      <Pagination />
    </>
  );
};
