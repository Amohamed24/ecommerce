'use client';
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"




interface ProductDetailsProps {
    id: number;
    title: string;     
    category: string;  
    gender: string;    
    price: string;     
    size: string;
}   


const ProductDetails: React.FC<ProductDetailsProps> = ({ 
    title, 
    category, 
    gender,
    price 
    }) => {
    const navigate = useNavigate();

    const navigateToCheckout = () => {
        navigate(`/checkout`)
    }  
   
    return (
        <main>
            <Header 
            />

            <div className="flex flex-row m-auto justify-center align-middle items-center h-[calc(100vh-80px)] gap-0 bg-gray-100">
                <section className="w-full mx-5 flex justify-end">
                    <div className="relative w-8/12 h-[35rem] overflow-hidden rounded-xl bg-teal-200">
                        <img 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </section>

                <section className="flex flex-col justify-between w-full mx-5 h-[35rem]">
                    <div>
                        <h1>{gender} {title}</h1>
                        <h3 className="mb-3">{gender} {category}</h3>
                        <h2>{price}</h2>
                    </div>

                    <div className="my-10 w-7/12">
                        <h2>Select Size</h2>
                        <p className="mt-5 flex flex-wrap gap-5 [&>button]:border [&>button]:px-2 [&>button]:py-1 [&>button]:text-lg [&>button]:border-gray-400 
                        [&>button]:rounded-[.25rem] [&>button]:cursor-pointer [&>button]:font-semibold [&>button]:w-[6rem] [&>button]:h-[3rem]">
                            <button className="hover:border-black">XS</button>
                            <button className="hover:border-black">S</button>
                            <button className="hover:border-black">M</button>

                            <button className="hover:border-black">L</button>
                            <button className="hover:border-black">XL</button>
                            <button className="hover:border-black">XXL</button>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 w-7/12 mt-0">
                        <button 
                            onClick={navigateToCheckout}
                            className="border-none bg-teal-200 py-5 px-20 rounded-[2.5rem] font-semibold text-lg cursor-pointer hover:bg-teal-100">Add to Bag</button>
                        <button className="border border-gray-400 py-5 px-20 rounded-[2.5rem] font-semibold text-lg cursor-pointer hover:border-gray-800">Favorite </button>
                    </div>
                </section>
            </div>
            
        </main>
    );
};

export default ProductDetails;
