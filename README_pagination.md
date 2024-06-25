
Если у вас большое количество контактов, подход в целом остается тем же, но есть некоторые нюансы и улучшения, которые можно учесть для оптимизации:

Пагинация:

Вместо загрузки всех контактов сразу, загружайте их порциями (страницами). Это уменьшит нагрузку на сервер и улучшит производительность приложения.
Оптимизация состояния:

Храните только минимально необходимую информацию в состоянии.
Используйте нормализацию данных для управления состоянием более эффективно.
Мемоизация:

Используйте селекторы reselect для мемоизации данных и уменьшения количества перерисовок компонентов.
Пример кода с учетом оптимизаций:
1. Пагинация:
Измените fetchContacts так, чтобы он принимал параметры пагинации:

javascript
Копировать код
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/contacts?page=${page}&limit=${limit}`);
      return response.data; // Предполагаем, что сервер возвращает данные и мета-информацию о пагинации
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
2. Обновленный слайс:
Измените слайс для поддержки пагинации:

javascript
Копировать код
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const initialState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const changeContacts = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload.contacts;
        state.totalPages = payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(deleteContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(contact => contact.id !== payload.id);
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export const { setPage } = changeContacts.actions;

export const selectContacts = state => state.contacts.items;
export const selectCurrentPage = state => state.contacts.currentPage;
export const selectTotalPages = state => state.contacts.totalPages;

export const contactsReducer = changeContacts.reducer;
3. Использование нормализации данных:
Если у вас очень много данных, нормализация может помочь управлять состоянием более эффективно.

Пример нормализации с normalizr:
javascript
Копировать код
import { normalize, schema } from 'normalizr';

const contact = new schema.Entity('contacts');
const contactListSchema = [contact];

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/contacts?page=${page}&limit=${limit}`);
      const normalizedData = normalize(response.data.contacts, contactListSchema);
      return { entities: normalizedData.entities, result: normalizedData.result, totalPages: response.data.totalPages };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  entities: {
    contacts: {},
  },
  result: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const changeContacts = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.entities.contacts = payload.entities.contacts;
        state.result = payload.result;
        state.totalPages = payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.entities.contacts[payload.id] = payload;
        state.result.push(payload.id);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(deleteContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        delete state.entities.contacts[payload.id];
        state.result = state.result.filter(id => id !== payload.id);
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export const { setPage } = changeContacts.actions;

export const selectContacts = state => state.contacts.result.map(id => state.contacts.entities.contacts[id]);
export const selectCurrentPage = state => state.contacts.currentPage;
export const selectTotalPages = state => state.contacts.totalPages;

export const contactsReducer = changeContacts.reducer;
Заключение:
Эти изменения помогут вам оптимизировать работу с большим количеством контактов. Пагинация и нормализация данных позволяют более эффективно управлять состоянием и улучшить производительность вашего приложения.








