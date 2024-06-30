import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  number: '',
};
const changeFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.name = action.payload;
    },
    setNumberFilter: (state, action) => {
      state.number = action.payload;
    },
  },
});
export const { setNameFilter, setNumberFilter } = changeFilter.actions;
export const changeFilterReducer = changeFilter.reducer;
