'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Products from '../data/Products';
import { ProductDetailsComponentProps } from '../types/types';

const ProductDetails: React.FC<ProductDetailsComponentProps> = ({
  listingData,
  setListingData,
  count,
  setCount,
  addToCart,
  starRating,
}) => {
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
            <div className="relative w-full h-[35rem] overflow-hidden rounded-xl bg-white">
              <img
                src={listingData.src}
                alt={listingData.title}
                className="w-full h-full object-contain"
              />
            </div>
          </section>

          <section className="flex flex-col justify-between w-7/12 pl-5 h-[35rem]">
            <div>
              <h1 className="text-2xl font-bold mb-2">{listingData.alt}</h1>

              <div className="flex items-center mb-2">
                {starRating &&
                  listingData.rating !== undefined &&
                  starRating(listingData.rating)}
                <span className="ml-1 text-gray-500 text-sm">
                  ({listingData.rating})
                </span>
              </div>

              <h3 className="mb-3 text-gray-600">
                {listingData.gender} {listingData.category}
              </h3>

              <div className="font-semibold text-2xl">
                <span className="text-sm align-super">$</span>
                {listingData.price}
              </div>

              <div className="text-base font-normal -mb-5 mt-5">
                <p className="font-semibold mb-3">Description</p>
                <p>{listingData.description}</p>
              </div>
            </div>

            <div className="my-10 w-full md:w-7/12">
              <h2 className="font-semibold">Select Size</h2>
              <p
                className="mt-5 flex flex-wrap gap-5 [&>button]:border [&>button]:px-2 [&>button]:py-1 [&>button]:text-lg [&>button]:border-gray-400
                       [&>button]:rounded-[.25rem] [&>button]:cursor-pointer [&>button]:font-semibold [&>button]:w-[6rem] [&>button]:h-[3rem]"
              >
                <button className="hover:border-black">S</button>
                <button className="hover:border-black">M</button>
                <button className="hover:border-black">L</button>
              </p>
            </div>

            <div className="flex flex-row gap-3 mt-0">
              <button
                onClick={addToCart}
                className="border-none bg-teal-400 py-5 px-20 rounded-[2.5rem] font-semibold text-lg text-white cursor-pointer hover:bg-teal-300"
              >
                Add to Cart
              </button>
              <button className="border-2 border-gray-400 py-5 px-20 rounded-[2.5rem] font-semibold text-lg cursor-pointer hover:border-gray-800">
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
