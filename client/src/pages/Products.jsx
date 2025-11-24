import React from 'react';
import ProductList from '../features/products/ProductList';
import AddProduct from '../features/products/AddProduct';

export default function Products() {
  return (
    <div className="p-4 flex gap-6">
      <div className="flex-1">
        <ProductList />
      </div>
      <div className="w-1/3">
        <AddProduct />
      </div>
    </div>
  );
}
