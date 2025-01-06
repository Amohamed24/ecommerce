import React from "react";
import ProductCard from "../components/ProductCard";
import Products from "../data/Products";



interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex flex-wrap m-auto justify-center w-9/12 mt-2 gap-9">
      {Products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          category={product.category}
          gender={product.gender}
          price={product.price}   
        />
      ))}
    </div>
  );
};

export default ProductList;


