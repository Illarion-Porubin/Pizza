import React from "react";
import { fetchPizzas } from "../../redux/slices/pizzaSlice";
import { useCustomDispatch } from "../../hooks/store";
import s from "./CategoriesComp.module.scss";

export const Categories: React.FC = () => {
  const dispatch = useCustomDispatch();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
  ];

  const menu = (id: number) => {
    dispatch(fetchPizzas(id));
    setActiveIndex(id);
  };

  return (
    <div className={s.categories}>
      <ul>
        {categories.map((value, index: number) => (
          <li
            className={activeIndex === index ? s.active : " "}
            onClick={() => menu(index)}
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
