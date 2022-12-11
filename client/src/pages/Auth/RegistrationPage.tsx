import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledEngineProvider } from "@mui/material/styles";
/////////////////////////////
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { useCustomSelector } from "../../hooks/store";
import { selectAuthData } from "../../redux/selectors";
import s from "./AuthPage.module.scss";

// import PhoneInput from "react-phone-input-2";
import ReactPhoneInput from "react-phone-input-material-ui";
// import "react-phone-input-2/lib/style.css";

export const RegistrationPage = React.memo(() => {
  const dispatch = useDispatch();
  const auth = useCustomSelector(selectAuthData);
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  console.log(phone.length);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (values: any) => {
    const user = {...values, phone}
    console.log(user);
    if (phone.length < 11) {
      return alert("Номер слишком мал, укажите 11 символов");
    } else {
      const data = await dispatch(fetchRegister(user));
      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
    }
  };

  console.log(isValid);

  if (auth.data?.user.isActivated === false) {
    return (
      <StyledEngineProvider injectFirst>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Подтверждение аккаунта  "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Письмо отправленно на почту, пожалуйста, подтвердите аккаунт.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/">
              <Button onClick={handleClose} autoFocus>
                Ок
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </StyledEngineProvider>
    );
  } else {
    return (
      <StyledEngineProvider injectFirst>
        <Paper classes={{ root: s.root }}>
          <Typography classes={{ root: s.title }} variant="h5">
            Создание аккаунта
          </Typography>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="text"
              error={Boolean(errors.name?.message)}
              className={s.field}
              label="Полное имя"
              fullWidth
              {...register("name", {
                required: {
                  value: true,
                  message:
                    "You must specify your first name before moving forward",
                },
                pattern: {
                  value: /^[A-ZА-ЯЁ ]+$/i,
                  message: "That's not a valid name where I come from...",
                },
              })}
            />

            <TextField
              type="email"
              error={Boolean(errors.email?.message)}
              {...register("email", { required: "Укажите email" })}
              className={s.field}
              label="E-Mail"
              fullWidth
            /> 

            <TextField
              type="password"
              error={Boolean(errors.password?.message)}
              {...register("password", { required: "Укажите password" })}
              className={s.field}
              label="Пароль"
              fullWidth
            />

            <ReactPhoneInput 
              error={Boolean(errors.tel?.message)}
              inputClass={s.input__phone}
              containerClass={s.input__conteiner}
              value={phone}
              country={"ru"}
              onChange={setPhone}
              component={TextField}
            />

            <Button
              disabled={!(phone.length >= 11) && !isValid}
              className={s.button__mui}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleClickOpen}
            >
              Зарегистрироваться
            </Button>
          </form>
          <p className={s.account}>Есть аккаунт?</p>
          <Link to="/login">
            <Button
              className={s.button__mui}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
            >
              Войти
            </Button>
          </Link>
        </Paper>
      </StyledEngineProvider>
    );
  }
});
