import axios from 'axios'; import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://task-manager-api.goit.global/';

// Utility to add JWT Утилиты для работы с JWT // setAuthHeader добавляет JWT в
заголовок Authorization для всех будущих запросов.

const setAuthHeader = (token) => { axios.defaults.headers.common.Authorization =
`Bearer ${token}`; };

// Utility to remove JWT // clearAuthHeader удаляет JWT из заголовка
Authorization. const clearAuthHeader = () => {
axios.defaults.headers.common.Authorization = ''; };

/

- POST @ /users/signup Создание асинхронного действия для регистрации
  пользователя
- body: { name, email, password } \*/ register - асинхронное действие для
  регистрации пользователя. 'auth/register' - строка, идентифицирующая действие.
  Асинхронная функция принимает credentials (объект с именем, email и паролем) и
  thunkAPI. Выполняется POST-запрос к /users/signup с credentials. Если запрос
  успешен, добавляем токен в заголовок Authorization с помощью setAuthHeader и
  возвращаем данные ответа. Если запрос не удался, возвращаем ошибку с помощью
  thunkAPI.rejectWithValue.

        export const register = createAsyncThunk(
        'auth/register',
        async (credentials, thunkAPI) => {
            try {
            const res = await axios.post('/users/signup', credentials);
            // After successful registration, add the token to the HTTP header
            setAuthHeader(res.data.token);
            return res.data;
            } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
            }
        }
        );

/

- POST @ /users/login Создание асинхронного действия для входа пользователя
- body: { email, password } \*/ logIn - асинхронное действие для входа
  пользователя. 'auth/login' - строка, идентифицирующая действие. Асинхронная
  функция принимает credentials (объект с email и паролем) и thunkAPI.
  Выполняется POST-запрос к /users/login с credentials. Если запрос успешен,
  добавляем токен в заголовок Authorization с помощью setAuthHeader и возвращаем
  данные ответа. Если запрос не удался, возвращаем ошибку с помощью
  thunkAPI.rejectWithValue.

        export const logIn = createAsyncThunk(
        'auth/login', async (credentials, thunkAPI) => {
            try {
            const res = await axios.post('/users/login', credentials);
            // After successful login, add the token to the HTTP header
            setAuthHeader(res.data.token);
            return res.data;
            } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
            }
        }
        );

/\*

- POST @ /users/logout Создание асинхронного действия для выхода пользователя
- headers: Authorization: Bearer token \*/ logOut - асинхронное действие для
  выхода пользователя. 'auth/logout' - строка, идентифицирующая действие.
  Асинхронная функция не принимает параметров (первый параметр \_ игнорируется)
  и использует thunkAPI. Выполняется POST-запрос к /users/logout. Если запрос
  успешен, удаляем токен из заголовка Authorization с помощью clearAuthHeader.
  Если запрос не удался, возвращаем ошибку с помощью thunkAPI.rejectWithValue.

        export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
        try {
            await axios.post('/users/logout');
            // After a successful logout, remove the token from the HTTP header
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        });

/\*

- GET @ /users/me Создание асинхронного действия для обновления данных
  пользователя
- headers: Authorization: Bearer token \*/ 
refreshUser - асинхронное действие
  для обновления данных пользователя. 'auth/refresh' - строка, идентифицирующая
  действие. Асинхронная функция не принимает параметров (первый параметр \_
  игнорируется) и использует thunkAPI. Получаем токен из состояния с помощью
  thunkAPI.getState(). Если токена нет, возвращаем ошибку с помощью
  thunkAPI.rejectWithValue. Если токен есть, добавляем его в заголовок
  Authorization с помощью setAuthHeader и выполняем GET-запрос к /users/me. Если
  запрос успешен, возвращаем данные ответа. Если запрос не удался, возвращаем
  ошибку с помощью thunkAPI.rejectWithValue.

        export const refreshUser = createAsyncThunk(
        'auth/refresh',
        async (_, thunkAPI) => {
            // Reading the token from the state via getState()
            const state = thunkAPI.getState();
            const persistedToken = state.auth.token;

            if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch user');
            }

            try {
            // If there is a token, add it to the HTTP header and perform the request
            setAuthHeader(persistedToken);
            const res = await axios.get('/users/me');
            return res.data;
            } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
            }
        }
        );

/\*

