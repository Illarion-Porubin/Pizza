import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRegister } from "../../redux/slices/authSlice";
import { useForm } from 'react-hook-form';

import styles from './AuthPage.module.scss';
import { useCustomSelector } from '../../hooks/store';

import { selectAuthData } from '../../redux/selectors';

export const RegistrationPage = () => {

  const auth = useCustomSelector(selectAuthData)

  const isAuth = Boolean(auth.data)
  
  console.log(auth, 'regist')

  console.log(isAuth)



  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: 'Василий Пупкин',
      email: 'vasya@test.ru',
      password: '12345'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchRegister(values))
    if(!data.payload) {
      alert('Не удалось зарегистрироваться!')
    }
    
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } 
  }


  if (isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
          {...register('name', { required: 'Укажите полное имя' })}className={styles.field} 
          label="Полное имя" 
          fullWidth 
      />
      <TextField 
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите email' })}className={styles.field} 
          label="E-Mail" 
          fullWidth 
      />
      <TextField 
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите password' })}className={styles.field} 
          label="Пароль" 
          fullWidth 
      />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
