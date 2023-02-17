import React from "react";
import { useCustomDispatch } from "../../hooks/store";
import { fetchSearchPizzas } from "../../redux/slices/pizzaSlice";
import useDebounce from "../../hooks/useDebounce";
import s from "./SearchComp.module.scss";

export const Search: React.FC = () => {
  const dispatch = useCustomDispatch();
  const [value, setValue] = React.useState<string>(``)
  const search = React.useRef<HTMLInputElement>(null)
  const debounce = useDebounce(value, 400)

  const clearSearch = () => {
    setValue(``);
    if(search.current){
      search.current.focus();
    }
  }

  React.useEffect(() => {
    if(debounce) {
      dispatch(fetchSearchPizzas(debounce));
    }
    else {
      dispatch(fetchSearchPizzas(``));
    }
  }, [dispatch, debounce]);

  return (
    <div className={s.search_wrap}>
      <svg
        className={s.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        className={s.search}
        placeholder="Поиск пиццы..."
        value={value}
      />
      <svg 
        className={s.cross} 
        onClick={clearSearch}
        viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g data-name="1" id="_1">
          <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
          <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
          <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
        </g>
      </svg>
    </div>
  );
};
