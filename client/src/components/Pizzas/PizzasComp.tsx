import React from "react";
import { useDispatch } from "react-redux";
import { cartSlice } from "../../redux/slices/cartSlice";
import { PizzaTypes, CartTypes } from "../../types/types";
import s from "./PizzasComp.module.scss";
import sb from "../../scss/components/_button.module.scss"


interface Props {
  data: PizzaTypes;
}

export const PizzasComp: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch()
  const [activeTypes, setActiveTypes] = React.useState<string>(data.types[0]);
  const [activeSize, setActiveSize] = React.useState<number>(data.sizes[0]);
  const [pizzaCount, setPizzaCount] = React.useState<number>(0);
  const [indexSize, setIndexSize] = React.useState<number>(0)
  const sizePrice = [0, 130, 255]

  const changeSize = (size: number, i: number) => {
    setActiveSize(size)
    setIndexSize(i)
  }

  //// поменять тип PizzaTypes на OrderType
  const orderPizza = (data: PizzaTypes) => {
    if(pizzaCount) {
      const newOrder = {
        ...data, 
        sizes: activeSize, 
        types: activeTypes, 
        pizzasCount: pizzaCount, 
        pizzasPrice: pizzaCount * (+data.price + +sizePrice[indexSize]),
        identity: data.name + activeTypes + indexSize
      }
      // console.log(newOrder, 'pizzaCount >>>>>><<<<<<<<+++++++++++++')
      dispatch<{payload: CartTypes; type: string}>(cartSlice.actions.addOrder(newOrder))
    }
  }

  return (
    <div className={s.pizza_block}>
      <img className={s.pizza_block__image} src={data.imageUrl} alt="Pizza" />
      <h4 className={s.pizza_block__title}>{data.name}</h4>
      <div className={s.pizza_block__selector}>
        <ul>
          {data.types.map((types, index) => (
            <li
              onClick={() => setActiveTypes(types)}
              className={activeTypes === types ? s.active : ""}
              key={types}
            >
              {types}
            </li>
          ))}
        </ul>
        <ul>
          {data.sizes.map((sizes, index) => (
            <li
              onClick={() => changeSize(sizes, index)}
              className={activeSize === sizes ? s.active : ""}
              key={sizes}
            >
              {sizes} см
            </li>
          ))}
        </ul>
      </div>
      <div className={s.pizza_block__bottom}>
        <div className={s.pizza_block__price}>{+data.price + +sizePrice[indexSize]} ₽</div>
        <div className={s.pizzaBlockValue}>
          <button
            className={s.countValue}
            onClick={() => setPizzaCount((prev) => prev + 1)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="#fe5f1e"
                />
              </g>
            </svg>
          </button>
          <button
            className={s.countValue}
            onClick={() =>
              setPizzaCount((prev) => (prev === 0 ? prev : prev - 1))
            }
          >
            <svg
              width="18"
              height="18"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 52.161 52.161"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M52.161,26.081c0,3.246-2.63,5.875-5.875,5.875H5.875C2.63,31.956,0,29.327,0,26.081l0,0c0-3.245,2.63-5.875,5.875-5.875
		              h40.411C49.531,20.206,52.161,22.835,52.161,26.081L52.161,26.081z"
                  fill="#fe5f1e"
                />
              </g>
            </svg>
          </button>
        </div>
        <div className={`${sb.button} ${sb.button__outline} ${sb.button__add}`} onClick={() => orderPizza(data)}>
          <span>Добавить</span>
          <i>{pizzaCount}</i>
        </div>
      </div>
    </div>
  );
};
