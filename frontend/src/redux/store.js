
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  // Middleware is added automatically by Redux Toolkit
});

export default store;
