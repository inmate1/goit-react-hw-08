import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, updateContact } from './operations';

import { logOut} from '../auth/operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const changeContacts = createSlice({
  name: 'contacts',
  initialState,
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
      .addCase(deleteContact.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(contact => contact._id !== payload);
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(logOut.fulfilled, (state, { payload }) => {
        state.items = [];
      })
      .addCase(updateContact.pending, (state, { payload }) => {
       state.loading = true;
       state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
          state.items = state.items.map(contact =>
            contact._id === payload.id ? payload : contact
          );
        state.loading = false;
      })
      .addCase(updateContact.rejected, (state, { payload }) => {
         state.error = payload;
         state.loading = false;
    })
  },
});

export const contactsReducer = changeContacts.reducer;
