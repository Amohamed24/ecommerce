import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { IoPersonOutline } from 'react-icons/io5';
import { ProductDetailsProps } from '../types/types';
import { useParams } from 'react-router-dom';
import Products from '../data/Products';
import { Router } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();
  const [listingData, setListingData] = useState<ProductDetailsProps | null>(
    null
  );

  // Load product data based on ID when component mounts
  useEffect(() => {
    if (id) {
      // Convert id from string to number if needed
      const productId = parseInt(id);
      // Find the product with matching ID from Products data
      const product = Products.find((product) => product.id === productId);
      if (product) {
        setListingData(product);
      } else {
        console.error('Product not found with ID:', id);
      }
    } else {
      console.error('No product ID provided');
    }
  }, [id]);

  const navigateToHome = () => {
    navigate('/');
  };

  // If no product data, use default price
  let itemPrice = Number(listingData?.price) || 0;

  let subTotal = itemPrice * quantity;

  let tax = Math.floor(subTotal * 7) / 100;

  let total = subTotal + tax;

  return (
    <main className='bg-gray-100 min-h-screen'>
      <header className="flex flex-row sticky top-0 justify-between min-h-[80px] align-middle items-center bg-white z-50 px-10">
        <Logo />
        <IoPersonOutline className="text-2xl" />
      </header>

      {listingData ? (
        <div className="flex flex-row m-auto h-[calc(100vh-80px)] gap-0 bg-gray-100">
          <section className="w-full flex flex-col mx-5 mt-20">
            <h1 className="font-bold mb-10 mx-5">
              My Bag:{' '}
              {listingData ? (
                <span className="font-normal">
                  ({quantity} Item{quantity > 1 ? 's' : ''})
                </span>
              ) : (
                <span className="font-normal ">No Items in Cart</span>
              )}
            </h1>

            <div className="flex flex-row">
              <div className="relative w-full h-[18rem] overflow-hidden mr-10">
                <img
                  className="w-full h-full object-cover"
                  src={listingData?.src}
                />
              </div>

              <div className="flex flex-col w-5/12">
                {/* Item Description*/}
                <div className="">
                  <h2>{listingData?.title}</h2>
                  <p>{listingData?.category}</p>
                  <p>{listingData?.size}</p>
                </div>

                <div className="flex justify-start gap-6 mt-auto">
                  <p>Free Shipping + Free Returns</p>
                </div>
              </div>

              <div className="flex flex-col w-10/12">
                {/* Price and Quantity Section */}
                <div className="flex flex-row justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">Item Price</p>
                    <p className="text-lg">${itemPrice}</p>
                  </div>

                  <div className="flex flex-col items-center align-middle">
                    <label className="font-semibold mb-1">Quantity</label>
                    <select
                      className="border border-black h-10 w-14 text-center"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    >
                      {listingData ? (
                        [...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))
                      ) : (
                        <option disabled></option>
                      )}
                    </select>
                  </div>

                  <div>
                    <p className="font-semibold">Total Price</p>
                    <p className="text-lg">${subTotal}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-6 mt-auto">
                  <button className="hover:text-blue-500 underline">
                    Save for Later
                  </button>
                  <button className="hover:text-red-500 underline">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <hr className="w-full my-10 bg-gray-300 h-[1px] border-0"></hr>
          </section>

          <section className="flex flex-col w-5/12 mx-10 mt-20">
            <h1 className="font-bold">Order Summary</h1>
            <div className="flex flex-col w-full my-5">
              <div className="flex flex-row justify-between items-center px-4 py-2">
                <p>Subtotal</p>
                <p className="text-lg">${subTotal}</p>
              </div>
              <hr className="w-full bg-gray-300 h-[1px] border-0" />

              <div className="flex flex-row justify-between items-center px-4 py-2">
                <p>Shipping</p>
                <p className="text-lg">FREE</p>
              </div>
              <hr className="w-full bg-gray-300 h-[1px] border-0" />

              <div className="flex flex-row justify-between items-center px-4 py-2">
                <p>Tax</p>
                <p className="text-lg">${tax}</p>
              </div>
              <hr className="w-full bg-gray-300 h-[1px] border-0" />

              <div className="flex flex-row justify-between items-center px-4 py-2">
                <h2 className="font-semibold">Estimated Total</h2>
                <h2 className="font-semibold text-lg">USD ${total}</h2>
              </div>
            </div>

            <button className="px-10 py-5 text-lg rounded-[10px] w-full font-semibold bg-red-600 text-white hover:bg-red-800 border-none">
              CHECKOUT
            </button>
          </section>
        </div>
      ) : (
        <div className="border border-none w-8/12 mt-10 mx-10 px-5 bg-white">
          <h1 className="text-2xl font-semibold pt-6">Your Cart is empty</h1>
          <p className='pt-5 pb-4'>Check your Saved for later items below or <span onClick={navigateToHome} className='text-blue-400 hover:cursor-pointer'>continue shopping</span></p>
        </div>
      )}
    </main>
  );
};

export default Checkout;
