// Операції слайсу auth

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../contacts/operations';

// Додайте у файл redux/auth/operations.js операції, оголошені за допомогою createAsyncThunk, для роботи з користувачем:

// register - для реєстрації нового користувача. Базовий тип екшену "auth/register". Використовується у компоненті RegistrationForm на сторінці реєстрації.
// login - для логіну існуючого користувача. Базовий тип екшену "auth/login". Використовується у компоненті LoginForm на сторінці логіну.
// logout - для виходу з додатка. Базовий тип екшену "auth/logout". Використовується у компоненті UserMenu у шапці додатку.
// refreshUser - оновлення користувача за токеном. Базовий тип екшену "auth/refresh". Використовується у компоненті App під час його монтування.
// Токен авторизованого користувача потрібно зберігати в локальному сховищі за допомогою бібліотеки persist.
axios.defaults.baseURL = apiUrl;

// Utility to add JWT Утилиты для работы с JWT
// setAuthHeader добавляет JWT в заголовок Authorization для всех будущих запросов.

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
// clearAuthHeader удаляет JWT из заголовка Authorization.
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
/*
 * POST @ /users/signup Создание асинхронного действия для регистрации пользователя
 * body: { name, email, password }
 */
// register - асинхронное действие для регистрации пользователя.
// 'auth/register' - строка, идентифицирующая действие.
// Асинхронная функция принимает credentials (объект с именем, email и паролем) и thunkAPI.
// Выполняется POST-запрос к /users/signup с credentials(реквизиты для входа).
// Если запрос успешен, добавляем токен в заголовок Authorization с помощью setAuthHeader и возвращаем данные ответа.
// Если запрос не удался, возвращаем ошибку с помощью thunkAPI.rejectWithValue.
export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post(
        '/users/signup',
        newUser
      );
      console.log(response);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// для обновления данных пользователя. 'auth/refresh' - строка, идентифицирующая
// действие. Асинхронная функция не принимает параметров (первый параметр \_
// игнорируется) и использует thunkAPI. Получаем токен из состояния с помощью
// thunkAPI.getState(). Если токена нет, возвращаем ошибку с помощью
// thunkAPI.rejectWithValue. Если токен есть, добавляем его в заголовок
// Authorization с помощью setAuthHeader и выполняем GET-запрос к /users/me. Если
// запрос успешен, возвращаем данные ответа. Если запрос не удался, возвращаем
// ошибку с помощью thunkAPI.rejectWithValue.

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
