import React from "react";
import { useCustomDispatch } from "../../hooks/store";
import { cartSlice } from "../../redux/slices/cartSlice";
import { PizzaTypes } from "../../types/types";
import s_b from "../../scss/components/_button.module.scss"
import s_pb from "../../scss/components/_pizza-block.module.scss"
import s from "./CartItemComp.module.scss";


export const CartItem: React.FC<PizzaTypes> = React.memo(
  ({ name, types, sizes, price, pizzasCount, imageUrl, identity }) => {
    const dispatch = useCustomDispatch();
    const onClickPlus = () => dispatch<{ payload: string; type: string; }>(cartSlice.actions.plusOrder(identity));
    const onClickMinus = () => dispatch<{ payload: string; type: string; }>(cartSlice.actions.minusOrder(identity));
    const onClickRemove = () => dispatch<{ payload: string; type: string; }>(cartSlice.actions.removeItem(identity));

    return (
      <div className={s.cart__item}>
        <div className={s.cart__item_img}>
          <img className={s_pb.pizza_block__image} src={imageUrl} alt="Pizza" />
        </div>
        <div className={s.cart__item_info}>
          <h3>{name}</h3>
          <p>
            {types}, {sizes} см.
          </p>
        </div>
        <div className={s.cart__item_count}>
          <button
            disabled={pizzasCount === 1}
            onClick={onClickMinus}
            className={`${s_b.button} ${s_b.button__outline} ${s_b.button__circle}`}        
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
             <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              ></path>
            </svg>
          </button>
          <b>{pizzasCount}</b>
          <button
            onClick={onClickPlus}
            className={`${s_b.button} ${s_b.button__outline} ${s_b.button__circle}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              ></path>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              ></path>
            </svg>        
          </button>
        </div>
        <div className={s.cart__item_price}>
          <b>{price * pizzasCount} ₽</b>
        </div>
        <div className={s.cart__item_remove}>
          <div
            onClick={onClickRemove}
            className={`${s_b.button} ${s_b.button__outline} ${s_b.button__circle}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="#000000"
            >
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"
              ></path>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }
);
