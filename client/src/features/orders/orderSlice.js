import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const res = await api.get('/orders');
  return res.data;
});

export const createOrder = createAsyncThunk('orders/create', async (payload) => {
  const res = await api.post('/orders', payload);
  return res.data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, state => { state.status = 'loading'; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  }
});

export default orderSlice.reducer;
