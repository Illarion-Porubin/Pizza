import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Navigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../hooks/store";
import { selectAuthData } from "../../redux/selectors";
import { fetchLogin } from "../../redux/slices/authSlice";
import { StyledEngineProvider } from "@mui/material/styles";
import s from "./AuthPage.module.scss";

export const LoginPage: React.FC = () => {
  const isAuth = useCustomSelector(selectAuthData)
  const dispatch = useDispatch();

  type FormValues = {
    email: string,
    password: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: "vasya@test.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if (!data.payload.isActivated) {
      return alert("Пожалуйста, подтвердите аккаунт");
    } else {
      if ("accessToken" in data.payload) {
        window.localStorage.setItem("token", data.payload.accessToken);
      }
    }
  };

  console.log(isAuth, "isAuth");

  if (isAuth.data?.isActivated) {
    return <Navigate to="/" />;
  }

  // const google = async () => {
  //   window.open("http://localhost:4400/api/google", "_self");
  // };

  return (
    <StyledEngineProvider injectFirst>
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
            className={s.button__mui}
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
          <Button
            className={s.button__mui}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Создать
          </Button>
        </Link>
        {/* <Button className={s.button__mui} onClick={google}>
          google
        </Button> */}
      </Paper>
    </StyledEngineProvider>
  );
};
