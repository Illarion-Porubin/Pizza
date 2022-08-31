import React, { FC } from "react";
import { PizzaCards } from "../components/PizzaBlock/PizzaCard";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { useCustomSelector } from "../hooks/store";
import { selectCurrentData } from "../store/selectors";
import { useDispatch } from "react-redux";
import { fetchPizzas } from "../store/slices/pizzaSlice";
import { PizzaTypes } from "../types/types";
import Skeleton from "../components/PizzaBlock/Skeleton";

export const HomePage: FC = () => {
    const pizzaState = useCustomSelector(selectCurrentData);
    const { filterMenu } = useCustomSelector(selectCurrentData);
    const newMenu = filterMenu === "Все" ? pizzaState.pizza.items : pizzaState.pizza.items.filter((value) => value.category === filterMenu)
  

    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(fetchPizzas())
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
                : newMenu.map((data: PizzaTypes) => (
                  <PizzaCards data={data} key={data._id}/>))
              }
            </div>
        </>
    )
}