import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dressList: [],
};

const dressSlice = createSlice({
  name: 'dress',
  initialState,
  reducers: {
    setDressList(state, action) {
      state.dressList = action.payload;
    },
  },
});

export const { setDressList } = dressSlice.actions;
export default dressSlice.reducer;
