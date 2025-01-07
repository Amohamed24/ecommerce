import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Products from "../data/Products";




interface ProductListProps {
  id: number;
  title: string;     
  category: string;  
  gender: string;    
  price: string;     
  size: string;
}


const ProductList = ( ProductListProps: any) => {

  return (
    <div className="flex flex-wrap m-auto justify-center w-9/12 mt-2 gap-9">
      {Products.map((product) => (
       
          <ProductCard
          key={product.id}
          title={product.title}
          category={product.category}
          gender={product.gender}
          price={product.price} 
          id={0} 
          size={""}        
          />        
      ))}
    </div>
  );
};

export default ProductList;
