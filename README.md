# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


npm i yup
npm i react-icons
npm install formik --save
Для разработки проекта на React, вам потребуется установить несколько основных пакетов. Вот основные из них:

React и ReactDOM:

react
react-dom
Create React App:

create-react-app (для быстрого создания начального шаблона проекта)
React Router (если вы планируете использовать маршрутизацию):

react-router-dom
Axios или Fetch API (для HTTP-запросов):

axios
Redux (если требуется управление состоянием на уровне приложения):

redux
react-redux
@reduxjs/toolkit (рекомендуется для упрощения работы с Redux)
Styled-components или Sass (для стилизации компонентов):

styled-components
node-sass
Prop-types (для проверки типов пропсов):

prop-types
Testing libraries (для написания тестов):

jest
react-testing-library
Utility libraries (для различных утилит):

lodash (утилиты для работы с массивами, объектами и т.д.)
classnames (упрощает работу с классами CSS)
Пример установки базовых пакетов
Для начала вам потребуется Node.js и npm (или yarn). После установки Node.js можно создать новый проект с помощью Create React App:

bash
Копировать код
npx create-react-app my-app
cd my-app
Далее можно установить дополнительные пакеты по мере необходимости. Например, для установки React Router:

bash
Копировать код
npm install react-router-dom
Для установки Axios:

bash
Копировать код
npm install axios
Для установки Styled-components:

bash
Копировать код
npm install styled-components
Для установки Redux и инструментов:

bash
Копировать код
npm install redux react-redux @reduxjs/toolkit
Это базовый набор пакетов для создания проекта на React. В зависимости от специфики вашего проекта, может потребоваться установка дополнительных библиотек и инструментов.

// export const selectFilteredContacts = (state) => {
//   const contacts = selectContacts(state);
//   const findContacts = selectNameFilter(state);
//   return contacts
//     .filter(contact =>
//       contact.name.toLowerCase().includes(findContacts.toLowerCase()))
// };

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, findContacts) => {
    return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(findContacts.toLowerCase())
    );
  }
);

////////import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://example.com/api', // Убедитесь, что указали правильный базовый URL
  headers: { 'Content-Type': 'application/json' },
});
Обновленный Thunk
javascript
Копировать код
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance'; // Предположим, что файл с экземпляром axios называется axiosInstance.js

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/contacts');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
Использование Thunk в Reducer
Убедитесь, что вы правильно используете созданный thunk в вашем contactsSlice.js:

javascript
Копировать код
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './contactsOps';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export default contactsSlice.reducer;
Заключение
С помощью этих улучшений ваш код станет более читаемым и устойчивым к ошибкам. Использование экземпляра Axios с предустановленными настройками улучшает поддержку и упрощает настройку заголовков и базового URL. Обработка ошибок, возвращающая более подробную информацию, поможет вам лучше диагностировать и обрабатывать различные типы ошибок.








