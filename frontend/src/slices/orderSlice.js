import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
  },
});

export const { setOrders, setCurrentOrder } = orderSlice.actions;

export const fetchOrders = (url, token) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
    dispatch(setOrders(response.data.data));
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

export const placeOrder = (url, orderData, token) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error; // Re-throw the error to handle it in components if needed
  }
};

export const verifyOrder = (url, success, orderId) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
    return response.data;
  } catch (error) {
    console.error('Error verifying order:', error);
    throw error; // Re-throw the error to handle it in components if needed
  }
};

export default orderSlice.reducer;
