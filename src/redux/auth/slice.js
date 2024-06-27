import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser, register } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

// Добавьте в файл redux/auth/operations.js операции, объявленные с помощью createAsyncThunk, для работы с пользователем:

// register– для регистрации нового пользователя. Базовый тип экшена "auth/register". Используется в компоненте RegistrationFormна странице регистрации.
// login– для логина существующего пользователя. Базовый тип экшена "auth/login". Используется в компоненте LoginFormна странице логина.
// logout– для выхода из приложения. Базовый тип экшена "auth/logout". Используется в компоненте UserMenuв приложенной шапке.
// refreshUser- обновление пользователя по токену. Базовый тип экшена "auth/refresh". Используется в компоненте App при его монтаже.

// Токен авторизованного пользователя нужно хранить в локальном хранилище с помощью библиотеки persist .
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, action) => {})
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logIn.pending, (state, action) => {})
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.pending, (state, action) => {})
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
