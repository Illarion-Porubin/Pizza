import React from "react";
import Stack from "@mui/material/Stack";
// import "react-phone-input-2/lib/style.css";

import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { selectAuthData } from "../../redux/selectors";
import { UploadWidget } from "../../components/Upload/UploadWidget";
import { fetchUpdate } from "../../redux/slices/authSlice";
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


  console.log(userInfo.data, 'userInfo<<<<<<<') // (что стало?)

  const { handleSubmit, setValue } = useForm({
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

  React.useEffect(() => {
    // if (userInfo.data) { // было userInfo.data.user (что стало?)
    //   setUserData(userInfo.data) // было userInfo.data.user (что стало?)
    // }
    if (userInfo.data?.phone) {
      setUserPhone(userInfo.data?.phone); // нужно выводить отдельно для работы ReactPhoneInput
    }
  }, [
    // setValue,
    // userInfo.data?.name,
    // userInfo.data?.color,
    // userInfo.data?.email,
    userInfo.data?.phone,
    userInfo.data
  ]);

  type submitType = {
    name: string | undefined;
    phone: string | undefined;
    color: string | undefined;
    email: string | undefined;
    publicId: string | undefined;
  };

  const onSubmit = async () => {
    const user: submitType = {
      phone: userPhone,
      name: userData?.name,
      email: userData?.email,
      color: userData?.color,
      publicId: userData?.publicId,
    };
    dispatch(fetchUpdate(user));
  };

  const publickId = (id: string) => {
    setUserData((prev: any) => prev = {...prev, imgId: id})
  };

  const checDataUser: boolean =
    userData?.color !== userInfo.data?.color ||
    userData?.name !== userInfo.data?.name ||
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
            publickId={(e: string) => publickId(e)}
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
              {colorArray.map((color, index: number) => (
                <li
                  key={color}
                  className={s.popup__colors}
                  style={{ backgroundColor: color }}
                  onClick={() => setUserData((prev: any) => prev = {...prev, color})}
                >
                  ㅤ
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
