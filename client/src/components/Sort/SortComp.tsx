import React from "react";
import { useCustomDispatch } from "../../hooks/store";
import { fetchSortPizzas } from "../../redux/slices/pizzaSlice";
import s from "./SortComp.module.scss"


interface Props {}

export const Sort: React.FC<Props> = () => {
  const dispatch = useCustomDispatch();
  const [open, setOpen] = React.useState(false);
  const [activeSort, setActiveSort] = React.useState<number>(0);

  const sortArray = [
    { name: `популярность (MORE)`, sort: "ratingmore" },
    { name: `популярность (LESS)`, sort: "ratingless" },
    { name: `цена (MORE)`, sort: "pricemore" },
    { name: `цена (LESS)`, sort: "priceless" },
    { name: `алфавит (MORE)`, sort: "namemore" },
    { name: `алфавит (LESS)`, sort: "nameless" },
  ];

  const sortRef = React.useRef<HTMLDivElement>(null);

  const selectSort = (index: number, sort: string) => {
    dispatch(fetchSortPizzas(sort));
    setActiveSort(index);
    setOpen(false);
  };

  type PopupClick = MouseEvent & {
    path: Node[];
  }

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    const _event = event as PopupClick;
    if (sortRef.current && !_event.path.includes(sortRef.current)) {
      setOpen(false);
    }
  },[]);

  React.useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      // размонтируем обработчик событий (addEventListener) при переходе на др стр
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={sortRef} className={s.sort}>
      <div className={s.sort__label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortArray[activeSort].name}</span>
      </div>
      <div className={open ? s.sort__popup : s.sort__popupDizable}>
        <ul>
          {sortArray.map((value, index: number) => (
            <li
              className={index === activeSort ? s.active : " "}
              key={value.name}
              onClick={() => selectSort(index, value.sort)}
            >
              {value.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
