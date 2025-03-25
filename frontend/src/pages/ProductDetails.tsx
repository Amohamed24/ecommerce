'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Products from '../data/Products';
import { ProductDetailsComponentProps } from '../types/types';
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    navigate('/cartPage');
  };

  const continueShopping = () => {
    navigate('/home');
  };

  const toggleDropdown = () => {
    setIsModal(!isModal);
  };

  const handleAddToCart = async () => {
    if (addToCart && listingData) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const productExists = cartItems.some(
        (item) => item.id === listingData.id
      );

      if (!productExists) {
        await addToCart();
        toggleDropdown();
      } else {
        toast.error('This item is already in your cart');
      }
    }
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
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-t-teal-400 border-gray-200 rounded-full animate-spin mb-4"></div>
            <p>Loading product details...</p>
          </div>
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

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 py-10">
        <div className="flex flex-col md:flex-row justify-center items-start max-w-7xl mx-auto p-4 md:p-10 gap-8">
          {/* Product Image */}
          <section className="w-full md:w-1/2 md:pr-5">
            <div className="relative w-full h-full max-h-[35rem] overflow-hidden rounded-xl bg-white shadow-sm">
              <img
                src={listingData.src}
                alt={listingData.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
          </section>

          {/* Product Details */}
          <section className="flex flex-col justify-between w-full md:w-1/2 md:pl-5">
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
                {listingData.gender}'s {listingData.category}
              </h3>

              <div className="font-semibold text-2xl mb-4">
                <span className="text-sm align-super">$</span>
                {listingData.price}
              </div>

              <div className="text-base font-normal mb-6">
                <p className="font-semibold mb-3">Description</p>
                <p className="text-gray-700">{listingData.description}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="border-none bg-teal-400 py-4 px-8 rounded-full font-semibold text-lg text-white cursor-pointer hover:bg-opacity-75 transition-colors flex items-center justify-center"
              >
                <MdOutlineShoppingBag className="mr-2" />
                Add to Cart
              </button>

              <button className="border-2 border-gray-400 py-4 px-8 rounded-full font-semibold text-lg cursor-pointer hover:border-gray-800 transition-colors">
                Add to Favorites
              </button>
            </div>
          </section>

          <ToastContainer position="bottom-right" autoClose={3000} />

          {isModal && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={toggleDropdown}
              ></div>

              <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 w-full max-w-2xl rounded-xl shadow-xl z-50 transition-all">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center">
                      <h2 className="font-semibold text-xl mr-3">
                        Added to Your Cart
                      </h2>
                      <MdOutlineShoppingBag className="text-xl text-teal-500" />
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
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg">
                        <img
                          src={listingData.src}
                          alt={listingData.title}
                          className="w-24 h-32 object-contain"
                        />
                      </div>
                      <div className="flex flex-col ml-5 gap-2 justify-center mt-5 lg:mt-3">
                        <h3 className="font-medium">{listingData.title}</h3>
                        <div className="text-sm text-gray-600">
                          Size: {listingData.size}
                        </div>
                        <div className="font-semibold">
                          ${listingData.price} USD
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-full md:w-64">
                      <div className="flex flex-row justify-between items-center mb-4 p-3 rounded-lg">
                        <span className="font-medium">Subtotal</span>
                        <span className="font-semibold">
                          ${listingData.price} USD
                        </span>
                      </div>

                      <button
                        className="bg-teal-400 hover:bg-opacity-75 text-white w-full mb-3 py-3 rounded-full font-medium transition-colors"
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
