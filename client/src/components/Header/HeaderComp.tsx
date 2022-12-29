import React from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/SearchComp";
import { useCustomSelector } from "../../hooks/store";
import { selectAuthData, selectCartData } from "../../redux/selectors";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authSlice, AuthState } from "../../redux/slices/authSlice";
import pizaLogo from "../../assets/img/pizza-logo.svg";
import sb from "../../scss/components/_button.module.scss"
import s from "./HeaderComp.module.scss";


type CurrentType = {
  price: number, 
  pizzasCount: number
}

export const Header: React.FC = () => {
  const cart = useCustomSelector(selectCartData)
  const totalPrice = cart.items?.reduce((sum: number, current: CurrentType) => sum + (current.price * current.pizzasCount), 0)
  const totalCount = cart.items?.reduce((sum: number, current: CurrentType) => sum + (current.pizzasCount), 0)
  const userAuth = useCustomSelector<AuthState>(selectAuthData);

  const dispatch = useDispatch()
  
  const userLogout = () => {
    if(window.confirm(`Вы точно хотите выйти?`)){
      dispatch(authSlice.actions.logout())
      window.localStorage.removeItem('token')
    }
  }


  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.container}>
          <Link to="/">
            <div className={s.header__logo}>
              <img width="38" src={pizaLogo} alt="Pizza logo" />
              <div className={s.logo__title}>
                <h1>React Pizza</h1>
                <p>самая вкусная пицца во вселенной</p>
              </div>
            </div>
          </Link>
          <Search />
          <div className={s.header__cart}>
          <Link to="/account">
            <Button>Кабинет</Button>
          </Link>
            <Link to="/login" className={s.header__user_wrapp}>
              {userAuth.data?.isActivated ? (
                <Button onClick={() => userLogout()} className={s.userEnter}>Выйти</Button>
                ) : (
                <Button className={s.userEnter}>Войти</Button>
              )}
            </Link>
            <Link to="/cart">
              <div className={`${sb.button} ${sb.button__cart}`}>
                <span>{totalPrice ? totalPrice : 0} ₽</span>
                <div className={sb.button__delimiter}></div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{totalCount ? totalCount : 0}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
