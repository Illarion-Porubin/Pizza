import React, { FC, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "react-phone-input-2/lib/style.css";
import cat from "../../../src/assets/img/cat.png";
import s from "./AccountPage.module.scss";
import "./sryle.scss";
import { useCustomSelector } from "../../hooks/store";
import { selectAuthData } from "../../redux/selectors";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { deepOrange } from '@mui/material/colors';
// import pencil from "../../assets/img/pencil.svg";

export const AccountPage: FC = () => {
  const userInfo = useCustomSelector<any>(selectAuthData);
  const [name, setName] = React.useState<any>("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  // const [pas, setPas] = React.useState("kjdhash23");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name,
      phone,
      email,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: any) => {
    console.log(values.phone);
    // if (!values || values.phone.length < 11) {
    //   return alert("Номер слишком мал, укажите 11 символов");
    // } else {
    //   const data = await dispatch(fetchRegister(values));
    //   if ("token" in data.payload) {
    //     window.localStorage.setItem("token", data.payload.token);
    //   }
    // }
  };

  const handleChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^+0-9]/g, "");
    if (onlyNums.length < 12 && onlyNums.length > 1) {
      setPhone(onlyNums);
    } else if (onlyNums.length === 12) {
      const number = onlyNums.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
        "$1($2)-$3-$4-$5"
      );
      setPhone(number);
      /// почистить номер от шлаков и токсинов
    }
  };

  // добавить фейерверк

  useEffect(() => {
    if (userInfo.status === "loaded") {
      setName(userInfo.data?.name);
      setPhone(userInfo.data?.phone);
      setEmail(userInfo.data?.email);
      // setPas(userInfo.data?.password);
    }
  }, [
    userInfo.status,
    userInfo.data?.phone,
    userInfo.data?.name,
    userInfo.data?.password,
    userInfo.data?.email,
  ]);

  console.log(errors, isValid);

  return (
    <>
      <Typography classes={{ root: s.title }} variant="h2">
        Личный кабинет
      </Typography>
      <Paper classes={{ root: s.root }}>
        <Stack direction="row" className={s.photo__wrap}>
          <Avatar
           className={s.photo} 
           alt="Remy Sharp" 
           src={cat} 
           sx={{ borderColor: `red`}}
           />
        </Stack>
        <form className={s.form}  onSubmit={handleSubmit(onSubmit)}>
          <TextField
            classes={{ root: s.Field }}
            type="text"
            error={Boolean(errors.name?.message)}
            {...register("name", { required: "Укажите полное имя" })}
            value={name}
            label="Полное имя"
            onChange={(e: any) => setName(e.target?.value)}
            fullWidth
            sx={{margin: `6px 0`}}
          />

          <TextField
            type="phone"
            error={Boolean(errors.phone?.message)}
            {...register("phone", { required: "Укажите телефон" })}
            value={phone}
            label="Phone"
            onChange={handleChange}
            fullWidth
            sx={{margin: `6px 0`}}
          />

          <TextField
            type="email"
            error={Boolean(errors.email?.message)}
            {...register("email", { required: "Укажите email" })}
            value={email}
            label="E-Mail"
            onChange={(e: any) => setEmail(e.target?.value)}
            fullWidth
            sx={{marginTop: `6px`}}
          />

          {/* <TextField
            type="password"
            error={Boolean(errors.password?.message)}
           
            {...register("password", { required: "Укажите password" })}
            className={s.field}
            label="Пароль"
            fullWidth
          /> */}

          <Button
            disabled={!isValid}
            className={s.Button}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Сохранить
          </Button>
        </form>
      </Paper>
    </>
  );
};
