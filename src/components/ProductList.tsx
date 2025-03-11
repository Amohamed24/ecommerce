import React from 'react';
import ProductCard from './ProductCard';

interface Products {
  id: number;
  title: string;
  category: string;
  gender: string;
  price: number;
  size: string;
  src: string;
  alt: string;
}

interface ProductListProps {
  products: Products[];
  search?: string;
  setSearch?: (value: string) => void;
}

const ProductList = ({
  products,
  search = '',
  setSearch,
}: ProductListProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[30rem] mt-4 justify-center itme-center">
        <input
          type="text"
          role="searchbox"
          placeholder="Search products"
          className="border border-gray-400 rounded p-2 w-full"
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="flex flex-wrap m-auto justify-center w-full mt-2 gap-9">
        {products.map((product) => (
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
