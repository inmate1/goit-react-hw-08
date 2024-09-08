import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts', {
        // headers: { 'Content-Type': 'application/json' },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact
        , {
        headers: { 'Content-Type': 'application/json' },
      
      }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => { 
    try {
      const response = await axios.delete(`/contacts/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
        console.log(response);
        console.log(id);
        return id; // Возвращаем только ID удаленного контакта
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
     
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, updatedContact }, thunkAPI) => {
    try {
      console.log(id);
      const response = await axios.patch( `/contacts/${id}`, updatedContact,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(id);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
   
    }
  }
);

