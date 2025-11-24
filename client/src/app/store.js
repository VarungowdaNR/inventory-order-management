import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import orderReducer from '../features/orders/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
});

export default store;
