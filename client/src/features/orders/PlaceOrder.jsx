import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../products/productSlice';
import { createOrder } from './orderSlice';

export default function PlaceOrder() {
  const dispatch = useDispatch();
  const { items: products } = useSelector(state => state.products);
  const [selected, setSelected] = useState({}); // productId -> qty

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const setQty = (id, qty) => {
    setSelected(prev => ({ ...prev, [id]: Number(qty) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const items = Object.entries(selected)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => ({ productId, qty }));

    if (items.length === 0) return alert('Select at least one item with qty > 0');

    try {
      await dispatch(createOrder({ items })).unwrap();
      alert('Order placed');
      setSelected({});
    } catch (err) {
      alert(err?.message || 'Order failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Place Order</h2>
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 gap-4">
          {products.map(p => (
            <div key={p._id} className="border p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name}</div>
                <div>Price: ₹{p.price}</div>
                <div>Stock: {p.stock}</div>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max={p.stock}
                  value={selected[p._1] || selected[p._id] || 0}
                  onChange={(e) => setQty(p._id, e.target.value)}
                  className="border p-1 w-20"
                />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="mt-4 p-2 bg-green-600 text-white">Place Order</button>
      </form>
    </div>
  );
}
