import React from "react";
import ProductCard from "../components/ProductCard";
import ProductData from "../data/productData";

const ProductList: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {ProductData.map((product, index) => (
        <ProductCard
          key={index}
          productTitle={product.productTitle}
          productType={product.productType}
          productPrice={product.productPrice} productImg={""}        />
      ))}
    </div>
  );
};

export default ProductList;
