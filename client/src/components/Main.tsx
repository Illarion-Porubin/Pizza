import React, { FC, useState } from "react";
import { PizzaCards } from "./PizzaCard";
import { Categories } from "./Categories";
import { Header } from "./Header";
import { Sort } from "./Sort";
import { useCustomSelector } from "../hooks/store";
import { selectCurrentData } from "../store/selectors";
import "../scss/components/_all.scss";

interface Props {}

type PizzaTypes = {
  id: number;
  imageUrl: string;
  name: string;
  types: string[];
  sizes: number[];
  price: number;
  category: string;
  rating: number;
}

export const Main: FC<Props> = () => {
  const pizzaState = useCustomSelector(selectCurrentData);
  const { filterMenu } = useCustomSelector(selectCurrentData);
  const newMenu = filterMenu === "Все" ? pizzaState.pizza : pizzaState.pizza.filter((value) => value.category === filterMenu)
  const [pizza, usePizza] = useState()
  

  return (
    <>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {newMenu.map((data: PizzaTypes) => (
                <PizzaCards data={data} key={data.id}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
