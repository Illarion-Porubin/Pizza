import React from "react";
import { Link } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectAuthData, selectCartData } from "../../redux/selectors";
import { CartItem } from "../../components/CartItem/CartItemComp";
import { cartSlice, fetchOrder } from "../../redux/slices/cartSlice";
import { v1 } from "uuid";
import { CartTypes } from "../../types/types";
import { CartState } from "../../redux/slices/cartSlice";
////////////ui////////////
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledEngineProvider, TextField } from "@mui/material";
//////////
import sb from "../../scss/components/_button.module.scss";
import s from "./CartPage.module.scss";
// import PhoneInput from "react-phone-input-2";
import ReactPhoneInput from "react-phone-input-material-ui";
import { AuthState } from "../../redux/slices/authSlice";
import confetti from "canvas-confetti";





export const CartPage: React.FC = React.memo(() => {
  const dispatch = useCustomDispatch();
  const cart = useCustomSelector<CartState>(selectCartData);
  const userInfo = useCustomSelector<AuthState>(selectAuthData);
  const [number, setNumber] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  /////////////////////////////confetti////////////////////////////////
  let duration = 3 * 1000;
  let animationEnd = Date.now() + duration;
  let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  const addConfetti = () => {
    let interval: any = setInterval(function() {
      let timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
  
      let particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  } 
  /////////////////////////////confetti/////////////////////////////////

  const openForm = React.useMemo<boolean>(() => {
    return open;
  }, [open]);

  React.useEffect((): void => {
    if (userInfo.data?.phone) {
      setNumber(userInfo.data?.phone)
    }
  }, [userInfo.data]);

  const totalPrice = cart.items?.reduce((sum: number, current: CartTypes) => sum + current.price * current.pizzasCount, 0);
  const totalCount = cart.items?.reduce((sum: number, current: CartTypes) => sum + current.pizzasCount, 0);
  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(cartSlice.actions.clearItems());
    }
  };

  const createOrder = () => {
    const order = {phone: number, items: cart.items};
    addConfetti()
    setOpen(false);
    dispatch(fetchOrder(order))
    dispatch(cartSlice.actions.clearItems());
  };

  return (
    <>
      {cart.items?.length ? null : (
        <h1 className={s.cart_empty}>Корзина пуста</h1>
      )}
      <div className={`${s.container} ${s.container__cart}`}>
        <div className={`${s.cart}`}>
          <div className={s.cart__top}>
            <h2 className={s.content__title}>
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
                ></path>
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className={s.cart__title}>Корзина</span>
            </h2>
            <div onClick={onClickClear} className={`${s.cart__clear}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 5H4.16667H17.5"
                  stroke="#B6B6B6"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                  stroke="#B6B6B6"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8.33337 9.16667V14.1667"
                  stroke="#B6B6B6"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11.6666 9.16667V14.1667"
                  stroke="#B6B6B6"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>Очистить корзину</span>
            </div>
          </div>
          <div className={`${s.content__items}`}>
            {React.useMemo(() => {
              return cart.items?.map((item: CartTypes) => (
                <CartItem key={v1()} {...item} />
              ));
            }, [cart.items])}
          </div>
          <div className={`${s.cart__bottom}`}>
            <div className={`${s.cart__bottom_details}`}>
              <span>
                Всего пицц: <b>{totalCount} шт.</b>{" "}
              </span>
              <span>
                Сумма заказа: <b>{totalPrice} ₽</b>{" "}
              </span>
            </div>
            <div className={`${s.cart__bottom_buttons}`}>
              <Link
                to="/"
                className={`${sb.button} ${sb.button__outline} ${sb.button__add} ${sb.go_back_btn}`}
              >
                <svg width="18" height="12" viewBox="0 0 8 14" fill="none">
                  <path
                    d="M7 13L1 6.93015L6.86175 1"
                    stroke="#D3D3D3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>Вернуться назад</span>
              </Link>
              {cart.items?.length ? (
                <>
                  <StyledEngineProvider injectFirst>
                    <Button variant="outlined" onClick={() => setOpen((prev) => !prev)}>
                      Сделать заказ
                    </Button>
                    <Dialog open={openForm} onClose={() => setOpen((prev) => !prev)}>
                      <DialogTitle>Ваш номер</DialogTitle>
                      <DialogContent>
                        <DialogContentText sx={{ mb: 3 }}>
                          Осталось совсем немного, введите свой номер телефона,
                          чтобы мы могли подтвердить ваш заказ.
                        </DialogContentText>
                        <form>
                          <ReactPhoneInput
                            inputProps={{
                              name: "phone",
                              autoFocus: true,
                            }}
                            inputClass={s.input__phone}
                            containerClass={s.input__conteiner}
                            country={"ru"}
                            placeholder="Enter phone number"
                            value={number}
                            onChange={setNumber}
                            component={TextField}
                          />
                        </form>
                        <DialogContentText
                          paragraph={true}
                          sx={{ mt: 3, mb: 0 }}
                        >
                          Продолжая, вы соглашаетесь со сбором и обработкой
                          персональных данных и {" "}
                          <Link to="#">пользовательским соглашением.</Link>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpen((prev) => !prev)}>Отмена</Button>
                        <Button onClick={createOrder}>Заказать</Button>
                      </DialogActions>
                    </Dialog>
                  </StyledEngineProvider>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
