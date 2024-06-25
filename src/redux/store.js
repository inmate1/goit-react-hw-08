import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { changeFilterReducer } from './filtersSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: changeFilterReducer,
  },
});

export { store };
