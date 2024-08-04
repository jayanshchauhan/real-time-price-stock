// app/features/priceSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prices: [] as any[], // Ensure prices is an array initially
};

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPrices(state, action) {
      state.prices = action.payload;
    },
  },
});

export const { setPrices } = priceSlice.actions;
export default priceSlice.reducer;
