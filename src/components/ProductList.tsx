import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Products from '../data/Products';

const ProductList = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search Bar */}
      <div className="w-[30rem] mt-4 justify-center itme-center">
        <input
          type="text"
          role="searchbox"
          placeholder="Search products"
          className="border border-gray-400 rounded p-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtered Product List using Search */}
      <div className="flex flex-wrap m-auto justify-center w-full mt-2 gap-9">
        {Products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        ).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            gender={product.gender}
            price={product.price}
            size={product.size}
            src={product.src}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
