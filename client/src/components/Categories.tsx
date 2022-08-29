import React, { FC, useState } from "react";
import "../scss/components/_categories.scss";
import { useDispatch } from "react-redux";
import { pizzaSlice } from "../store/slices/pizzaSlice";


export const Categories: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  

  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
  ];

  const dispatch = useDispatch();



  const menu = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget,  InnerHTML>, index: number) => {
    dispatch(pizzaSlice.actions.filterMenu({menu: e.target.innerHTML}))
    setActiveIndex(index)
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index: number) => (
          <li
            className={activeIndex === index ? "active" : " "}
            onClick={(e: any) => menu(e, index)}
            key={index}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
