'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Products from '../data/Products';
import { ProductDetailsComponentProps } from '../types/types';

const ProductDetails: React.FC<ProductDetailsComponentProps> = ({
  listingData,
  setListingData,
  count,
  setCount,
  addToCart,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const newProduct = Products.find((p) => p.id === productId);

      if (newProduct) {
        setListingData(newProduct);
      } else {
        console.error('Product not found');
      }
    }
  }, [id, setListingData]);

  const navigateToCheckout = () => {
    if (listingData) {
      navigate(`/checkout/`);
    }
  };

  // Show loading state while data is being fetched
  if (!listingData) {
    return (
      <main>
        <Header
          search=""
          setSearch={() => {}}
          products={[]}
          count={count || 0}
          setCount={setCount || (() => {})}
        />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <p>Loading product details...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header
        search=""
        setSearch={() => {}}
        products={[]}
        count={count || 0}
        setCount={setCount || (() => {})}
      />

      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gray-100">
        <div className="flex flex-row justify-center items-center max-w-7xl mx-auto p-10">
          <section className="w-1/2 pr-5">
            <div className="relative w-full h-[35rem] overflow-hidden rounded-xl bg-teal-200">
              <img
                src={listingData.src}
                alt={listingData.title}
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section className="flex flex-col justify-between w-1/2 pl-5 h-[35rem]">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {listingData.gender} {listingData.title}
              </h1>
              <h3 className="mb-3 text-gray-600">
                {listingData.gender} {listingData.category}
              </h3>
              <h2 className="text-2xl font-semibold">${listingData.price}</h2>
            </div>

            <div className="my-10 w-full md:w-7/12">
              <h2 className="font-semibold">Select Size</h2>
              <p
                className="mt-5 flex flex-wrap gap-5 [&>button]:border [&>button]:px-2 [&>button]:py-1 [&>button]:text-lg [&>button]:border-gray-400
                       [&>button]:rounded-[.25rem] [&>button]:cursor-pointer [&>button]:font-semibold [&>button]:w-[6rem] [&>button]:h-[3rem]"
              >
                <button className="hover:border-black">XS</button>
                <button className="hover:border-black">S</button>
                <button className="hover:border-black">M</button>
                <button className="hover:border-black">L</button>
                <button className="hover:border-black">XL</button>
                <button className="hover:border-black">XXL</button>
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-7/12 mt-0">
              <button
                onClick={addToCart}
                className="border-none bg-teal-200 py-5 px-20 rounded-[2.5rem] font-semibold text-lg cursor-pointer hover:bg-teal-100"
              >
                Add to Cart
              </button>
              <button className="border border-gray-400 py-5 px-20 rounded-[2.5rem] font-semibold text-lg cursor-pointer hover:border-gray-800">
                Favorite{' '}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
