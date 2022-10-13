import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../hooks/store";
import { selectAuthData, selectCartData } from "../../redux/selectors";
import { fetchOrder } from "../../redux/slices/authSlice";
import { cartSlice, fetchGetCart } from "../../redux/slices/cartSlice";
// import { fetchAddPizzas,  } from "../../redux/slices/cartSlice";
import { PizzaTypes } from "../../types/types";
import s from "./PizzaCard.module.scss";

interface Props {
  data: PizzaTypes;
}

export const PizzaCards: FC<Props> = ({ data }) => {
  const cart = useCustomSelector(selectCartData);

  const [activeTypes, setActiveTypes] = useState<string>(data.types[0]);
  const [activeSize, setActiveSize] = useState<number>(data.sizes[0]);
  const [pizzaCount, setPizzaCount] = useState<number>(0);

  const auth = useCustomSelector(selectAuthData);

  const dispatch = useDispatch()

  const id = useCustomSelector(selectAuthData).data?._id

  const orderPizza = (data: PizzaTypes) => {
    if(pizzaCount) {
      const newOrder = {...data, sizes: activeSize, types: activeTypes, count: pizzaCount}
      console.log(id)
      dispatch(fetchOrder({newOrder, userId: id} ))
    }
  }

  useEffect(() => {
    // dispatch(fetchGetCart(auth.data?._id)) 
    dispatch(fetchGetCart('634565bcabd56b3e3a8946f9')) 

  }, [dispatch, auth])

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={data.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{data.name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {data.types.map((types, index) => (
            <li
              onClick={() => setActiveTypes(types)}
              className={activeTypes === types ? "active" : ""}
              key={index}
            >
              {types}
            </li>
          ))}
        </ul>
        <ul>
          {data.sizes.map((sizes, index) => (
            <li
              onClick={() => setActiveSize(sizes)}
              className={activeSize === sizes ? "active" : ""}
              key={index}
            >
              {sizes}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{data.price} ₽</div>
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
        <div className="button button--outline button--add" onClick={() => orderPizza(data)}>
          <span>Добавить</span>
          <i>{pizzaCount}</i>
        </div>
      </div>
    </div>
  );
};
