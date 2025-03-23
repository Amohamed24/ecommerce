'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Products from '../data/Products';
import { ProductDetailsComponentProps } from '../types/types';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineShoppingBag } from 'react-icons/md';

const ProductDetails: React.FC<ProductDetailsComponentProps> = ({
  listingData,
  setListingData,
  count,
  setCount,
  addToCart,
  starRating,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

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
    navigate('/checkout');
  };

  const continueShopping = () => {
    navigate('/home');
  };

  const toggleDropdown = () => {
    setIsModal(!isModal);
  };

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
                onClick={toggleDropdown}
                className="border-none bg-teal-400 py-5 px-20 rounded-[2.5rem] font-semibold text-lg text-white cursor-pointer hover:bg-teal-300"
              >
                Add to Cart
              </button>
              <button className="border-2 border-gray-400 py-5 px-20 rounded-[2.5rem] font-semibold text-lg cursor-pointer hover:border-gray-800">
                Favorite{' '}
              </button>
            </div>
          </section>

          {isModal && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={toggleDropdown}
              ></div>

              <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-7/12 max-w-4xl rounded-xl shadow-xl z-50 transition-all">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between w-full mb-4">
                    <div className="flex items-center">
                      <h1 className="font-semibold text-2xl mr-3">
                        You've Got Great Taste
                      </h1>
                      <MdOutlineShoppingBag className="text-2xl text-teal-500" />
                    </div>
                    <button
                      onClick={toggleDropdown}
                      className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <hr className="mb-5 border-gray-200" />

                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex flex-row">
                      <div className="p-2 rounded-lg">
                        <img
                          src={listingData.src}
                          alt={listingData.title}
                          className="w-32 h-40 object-contain"
                        />
                      </div>
                      <div className="flex flex-col ml-5 gap-2 justify-center">
                        <h2 className="font-medium">{listingData.title}</h2>
                        <div className="text-gray-600">
                          Size: {listingData.size || 'Selected size'}
                        </div>
                        <div className="font-semibold">
                          ${listingData.price} USD
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-full md:w-64">
                      <div className="flex flex-row justify-between items-center mb-4 p-3 rounded-lg">
                        <h1 className="font-medium">Subtotal</h1>
                        <div className="font-semibold">
                          ${listingData.price} USD
                        </div>
                      </div>

                      <button
                        className="bg-teal-500 hover:bg-teal-600 text-white w-full mb-3 py-3 rounded-full font-medium transition-colors"
                        onClick={navigateToCheckout}
                      >
                        VIEW BAG & CHECKOUT
                      </button>

                      <button
                        className="flex flex-row items-center justify-center text-gray-700 hover:text-teal-600 py-2 transition-colors font-medium w-full"
                        onClick={continueShopping}
                      >
                        CONTINUE SHOPPING
                        <FaArrowRightLong className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
