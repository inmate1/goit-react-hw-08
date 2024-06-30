import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../contacts/operations';

axios.defaults.baseURL = apiUrl;

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', newUser);
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
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const currentOperation = createAsyncThunk(
//   'auth/current',
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const { auth } = getStateQ;
//       setHeaderToken(auth.token);
//       const { data } = await axios.get('users/current');
//       setHeaderToken(data.token);
//       return data;
//     } catch (error) {
//       clearHeaderTokenQ;
//       return rejectWithValue(error.message);
//     }
//   },
//   {
//     condition: (_, { getState }) => {
//       const { auth } = getStateQ;
//       if (!auth.token) {
//         return false;
//       }
//     },
//   }
// );
