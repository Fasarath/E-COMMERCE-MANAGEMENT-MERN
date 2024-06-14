import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      if (state.cartItems[itemId] > 0) {
        state.cartItems[itemId] -= 1;
      }
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
