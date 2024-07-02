import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts', {
        headers: { 'Content-Type': 'application/json' },
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
    console.log(id);
    
    try {
      const response = await axios.delete(`/contacts/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
     
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updatedContact }, thunkAPI) => {
     console.log('Arguments passed to updateContact:', {
       contactId,
       updatedContact,
     });
    console.log({updateContact});
    
    try {
      const response = await axios.patch( `/contacts/${contactId}`,updatedContact,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
   
    }
  }
);

