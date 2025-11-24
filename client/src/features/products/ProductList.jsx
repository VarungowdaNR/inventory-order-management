import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import Loader from '../../components/Loader';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  if (status === 'loading') return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Products</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p._id} className={p.stock <= 5 ? 'bg-yellow-100' : ''}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.price}</td>
              <td className="border px-4 py-2">{p.stock}</td>
              <td className="border px-4 py-2">{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
