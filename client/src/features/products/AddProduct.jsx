import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './productSlice';

export default function AddProduct() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', price: 0, stock: 0, category: '' });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addProduct({
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category || 'general'
    }));
    setForm({ name: '', price: 0, stock: 0, category: '' });
  };

  return (
    <form onSubmit={onSubmit} className="p-4 max-w-md">
      <h3 className="mb-2">Add Product</h3>
      <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="border p-2 w-full mb-2"/>
      <input name="price" value={form.price} onChange={onChange} type="number" placeholder="Price" className="border p-2 w-full mb-2"/>
      <input name="stock" value={form.stock} onChange={onChange} type="number" placeholder="Stock" className="border p-2 w-full mb-2"/>
      <input name="category" value={form.category} onChange={onChange} placeholder="Category" className="border p-2 w-full mb-2"/>
      <button className="p-2 bg-blue-600 text-white">Add</button>
    </form>
  );
}
