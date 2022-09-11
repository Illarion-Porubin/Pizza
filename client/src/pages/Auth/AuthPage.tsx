import { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./AuthPage.module.scss";
import "../scss/components/_all.scss";
import { useForm } from "react-hook-form"
import { fetchRegister, selectIsAuth } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const AuthPage: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "user@mail1.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert("Не удалось авторизоваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  // if (isAuth) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите email" })}
          fullWidth
        />
        <TextField
          className={styles.field}
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
    </Paper>
  );
};
