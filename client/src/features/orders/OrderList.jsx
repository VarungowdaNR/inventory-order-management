import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './orderSlice';
import Loader from '../../components/Loader';

export default function OrderList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.orders);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrders());
  }, [dispatch, status]);

  if (status === 'loading') return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Orders</h2>
      <ul>
        {items.map(o => (
          <li key={o._id} className="mb-3 border p-3">
            <div><strong>Order ID:</strong> {o._id}</div>
            <div><strong>Total:</strong> ₹{o.totalAmount}</div>
            <div><strong>Status:</strong> {o.status}</div>
            <div className="mt-2">
              <strong>Items:</strong>
              <ul className="pl-5">
                {o.items.map(it => (
                  <li key={it._id || it.productId._id}>
                    {it.productId?.name || it.productId} — qty: {it.qty}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
