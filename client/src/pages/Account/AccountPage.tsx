import React from "react";
import Stack from "@mui/material/Stack";

import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { selectAuthData } from "../../redux/selectors";
import { UploadWidget } from "../../components/Upload/UploadWidget";
import { fetchUpdate, fetchAuthMe } from "../../redux/slices/authSlice";
import { AuthState } from "../../redux/slices/authSlice";
import { UserTypes } from "../../types/types";
import { useForm } from "react-hook-form";

import ReactPhoneInput from "react-phone-input-material-ui";
import s from "./AccountPage.module.scss";
import "./sryle.scss";
// import pencil from "../../assets/img/pencil.svg";

export const AccountPage: React.FC = () => {
  const dispatch = useCustomDispatch();
  const userInfo = useCustomSelector<AuthState>(selectAuthData);
  const [userData, setUserData] = React.useState<UserTypes | null>(null);
  const [userPhone, setUserPhone] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [checkData, setCheckData]  = React.useState<boolean>(false);

  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  const colorArray: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "aqua",
    "rebeccapurple",
    "black",
  ];

  const onSubmit = async () => {
    const user: UserTypes = {
      phone: userPhone,
      name: userData?.name,
      email: userData?.email,
      color: userData?.color,
    };
    dispatch(fetchUpdate(user)); 
    setTimeout(() => {
      dispatch(fetchAuthMe()); 
    }, 100)
    setCheckData((prev: boolean) => prev = !prev)
  };



  React.useEffect(() => {  
    console.log(userInfo.data)
    if (userInfo.data) { // было userInfo.data.user (что стало?)
      setUserData(userInfo.data) // было userInfo.data.user (что стало?)
    }

    if (userInfo.data?.phone) {
      setUserPhone(userInfo.data?.phone); // нужно выводить отдельно для работы ReactPhoneInput
    }  
  }, [userInfo.data?.phone, userInfo.data, checkData]);


  const checDataUser: boolean =
    userData?.color !== userInfo.data?.color ||
    userData?.name !== userInfo.data?.name ||
    userData?.publicId !== userInfo.data?.publicId ||
    (userPhone.length >= 11 && userPhone !== userInfo.data?.phone);

  return (
    <>
      <Typography className={s.title} variant="h2">
        Личный кабинет
      </Typography>
      <Paper className={s.root}>
        <Stack direction="row" className={s.photo__wrap}>
          <UploadWidget
            color={userData?.color}
          />
        </Stack>
        <div className={s.popup}>
          <div className={s.popup__wrap} onClick={() => setOpen(!open)}>
            <span className={s.popup__text_color}>Change color</span>
            <div
              className={s.popup__main_color}
              style={{ backgroundColor: userData?.color }}
            ></div>
          </div>
          <div className={s.popup__block}>
            <ul className={open ? s.popup__color_open : s.popup__color}>
              {colorArray.map((color) => (
                <li
                  key={color}
                  className={s.popup__colors}
                  style={{ backgroundColor: color }}
                  onClick={() => setUserData((prev: any) => prev = {...prev, color})}
                >
                </li>
              ))}
            </ul>
          </div>
        </div>
        <StyledEngineProvider injectFirst>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="text"
              className={s.field}
              label="Полное имя"
              value={userData?.name ? userData?.name : "Ваше имя"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserData((prev: any) => prev = {...prev, name: e.target?.value})
              }
              fullWidth
            />

            <ReactPhoneInput
              inputClass={s.input__phone}
              containerClass={s.input__conteiner}
              country={"ru"}
              value={userPhone ? userPhone : "+7"}
              onChange={setUserPhone}
              component={TextField}
            />

            <Button
              disabled={!checDataUser}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
            >
              Сохранить изменения
            </Button>
          </form>
        </StyledEngineProvider>
      </Paper>
    </>
  );
};
