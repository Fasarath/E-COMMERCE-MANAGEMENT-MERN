import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dressReducer from './slices/dressSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  dress: dressReducer,
  cart: cartReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
