import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchPizzas } from "../../store/slices/pizzaSlice";

import s from "./Search.module.scss";

export const Search: FC = () => {
    const [searchName, setSearchName] = useState<string>('')
    const dispatch = useDispatch();

    useEffect(() => {
        if(searchName !== '') {
            dispatch(fetchSearchPizzas(searchName))
        }
    }, [searchName, dispatch])

  return (
    <div className={s.search_wrap}>
      <svg className={s.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>

      <input onChange={e => setSearchName(e.target.value)} className={s.search} placeholder="Поиск пиццы..." value={searchName}/>
    </div>
  );
};
