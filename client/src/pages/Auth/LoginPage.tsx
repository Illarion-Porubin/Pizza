import { FC, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import s from "./AuthPage.module.scss";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../hooks/store";

import "./AuthPage.module.scss";
import { selectAuthData } from "../../redux/selectors";
import { fetchGoogle, fetchLogin } from "../../redux/slices/authSlice";

export const LoginPage: FC = () => {
  const isAuth = Boolean(useCustomSelector(selectAuthData).data);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "vasya@test.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchLogin(values));
    console.log(data)
    if (!data.payload) {
      alert("Не удалось авторизоваться");
    }

    if ("accessToken" in data.payload) {
      window.localStorage.setItem("token", data.payload.accessToken);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  // useEffect(() => {

  // }, [])



  const google = async () => {
    // return await dispatch(fetchGoogle());
    window.open("http://localhost:4400/api/google", "_self")
  }

  

  return (
    <Paper classes={{ root: s.root }}>
      <Typography classes={{ root: s.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={s.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите email" })}
          fullWidth
        />
        <TextField
          className={s.field}
          label="password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите password" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
      <p className={s.account}>Нет аккаунта?</p>
      <Link to="/regist">
        <Button type="submit" size="large" variant="contained" fullWidth>
          Создать
        </Button>
      </Link>
      <Button onClick={google}>google</Button>
    </Paper>
  );
};
