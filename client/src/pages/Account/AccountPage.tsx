import React, { FC, useEffect } from "react";
// import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
// import "react-phone-input-2/lib/style.css";
// import cat from "../../../src/assets/img/cat.png";

import { useCustomSelector } from "../../hooks/store";
import { selectAuthData } from "../../redux/selectors";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledEngineProvider } from "@mui/material/styles";
import ReactPhoneInput from "react-phone-input-material-ui";
import { useDispatch } from "react-redux";
import { fetchUpdate } from "../../redux/slices/authSlice";
import { UploadWidget } from "../../components/Upload/UploadWidget";
import s from "./AccountPage.module.scss";
import "./sryle.scss";
// import pencil from "../../assets/img/pencil.svg";

export const AccountPage: FC = () => {
  const dispatch = useDispatch();
  const userInfo = useCustomSelector<any>(selectAuthData);
  const [activeColor, setActiveColor] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [name, setName] = React.useState<any>("");
  const [tel, setTel] = React.useState<any>("");
  const [publicId, setPublicId] = React.useState<any>("");

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

  useEffect(() => {
    if (userInfo.data?.name) {
      setName(userInfo.data?.name);
    }
    setTel(userInfo.data?.phone);
    setActiveColor(userInfo.data?.color);
  }, [
    setValue,
    setActiveColor,
    userInfo.data?.name,
    userInfo.data?.phone,
    userInfo.data?.color,
  ]);

  const onSubmit = async () => {
    const user = {
      name,
      publicId,
      phone: tel,
      color: activeColor,
      email: userInfo.data?.email,
    };
    console.log(user)
    dispatch(fetchUpdate(user));
  };

  const publickId = (id: any) => {
    setPublicId(id)
  }

  const checDataUser =
    activeColor !== userInfo.data?.color ||
    name !== userInfo.data?.name ||
    (tel?.length >= 11 && tel !== userInfo.data?.phone);

  return (
    <>
      <Typography className={s.title} variant="h2">
        Личный кабинет
      </Typography>
      <Paper className={s.root}>
        <Stack direction="row" className={s.photo__wrap} >
            <UploadWidget color={activeColor} publickId={(e: any) => publickId(e)}/>
        </Stack>
        <div className={s.popup}>
          <div className={s.popup__wrap} onClick={() => setOpen(!open)}>
            <span className={s.popup__text_color}>Change color</span>
            <div
              className={s.popup__main_color}
              style={{ backgroundColor: activeColor }}
            ></div>
          </div>
          <div className={s.popup__block}>
            <ul className={open ? s.popup__color_open : s.popup__color}>
              {colorArray.map((color, index: number) => (
                <li
                  key={index}
                  className={s.popup__colors}
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(color)}
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
              value={name}
              onChange={(e: any) => setName(e.target?.value)}
              fullWidth
            />

            <ReactPhoneInput
              inputClass={s.input__phone}
              containerClass={s.input__conteiner}
              country={"ru"}
              value={tel}
              onChange={setTel}
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
