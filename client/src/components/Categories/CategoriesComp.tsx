import { FC, useState } from "react";
import { fetchPizzas } from "../../redux/slices/pizzaSlice";
import { useDispatch } from "react-redux";
import s from "./CategoriesComp.module.scss";

export const Categories: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dispatch = useDispatch();

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
            key={index}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};