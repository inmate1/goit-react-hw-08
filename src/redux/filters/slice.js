import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};
const changeFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const { setNameFilter } = changeFilter.actions;
export const changeFilterReducer = changeFilter.reducer;
