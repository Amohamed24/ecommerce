import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartProps } from '../types/types';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage: React.FC<CartProps> = ({
  checkArr,
  setCheckArr,
  count,
  setCount,
  search,
  setSearch,
  products,
  addToCart,
  removeItem,
}) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';  

  const navigate = useNavigate();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    () => {
      const savedQuantities = localStorage.getItem('cartQuantities');
      if (savedQuantities) {
        return JSON.parse(savedQuantities);
      }

      return (
        checkArr?.reduce(
          (acc, item) => {
            const itemId = item._id || item.id;
            if (itemId) {
              acc[itemId] = 1;
            }
            return acc;
          },
          {} as { [key: string]: number }
        ) || {}
      );
    }
  );

  const navigateToHome = () => {
    navigate('/home');
  };

  const navigateToCheckout = () => {
    navigate('/checkoutPage');
  };

  const updateQuantity = async (
    productId: string | number | undefined,
    newQuantity: number
  ) => {
    if (productId !== undefined) {
      const updatedQuantities = {
        ...quantities,
        [productId]: newQuantity,
      };
      setQuantities(updatedQuantities);

      localStorage.setItem('cartQuantities', JSON.stringify(updatedQuantities));

      // If user is logged in, then update quantity in backend
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch(`${API_URL}/api/user/update-cart-quantity`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: productId.toString(),
              quantity: newQuantity,
            }),
          });
        } catch (error) {
          console.error('Error updating quantity in backend:', error);
        }
      }
    }
  };

  const getItemSubtotal = (item: any) => {
    const price = Number(item.price) || 0;
    const itemId = item._id || item.id;
    const qty = itemId ? quantities[itemId] || 1 : 1;
    return price * qty;
  };

  const calculateSubtotal = () => {
    return (
      checkArr?.reduce((total, item) => {
        return total + getItemSubtotal(item);
      }, 0) || 0
    );
  };

  const subTotal = calculateSubtotal();
  const tax = Math.floor(subTotal * 7) / 100;
  const total = subTotal + tax;

  const totalItems =
    checkArr?.reduce((count, item) => {
      const itemId = item._id || item.id;
      return count + (itemId ? quantities[itemId] || 1 : 1);
    }, 0) || 0;

  return (
    <main className="min-h-screen">
      <Header
        search=""
        setSearch={() => {}}
        products={products}
        count={count}
        setCount={setCount}
        addToCart={addToCart}
      />

      {checkArr && checkArr.length > 0 ? (
        <div className="flex flex-col lg:mx-20 mt-6 mx-5 lg:mb-0 mb-10">
          <h1 className="font-bold mb-10 mx-5">
            My Bag:{' '}
            <span className="font-normal">
              ({totalItems} Item{totalItems > 1 ? 's' : ''})
            </span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <section className="w-full lg:2/3 flex flex-col lg:mx-5 ">
              {checkArr.map((item, index) => {
                const itemId = item._id || item.id;
                const imageSrc = item.image?.[0] || item.src || '';
                
                return (
                  <div
                    key={`${itemId}-${index}`}
                    className="border border-gray-200 bg-white rounded-xl shadow-sm mb-6 overflow-hidden"
                  >
                    <div className="p-6 flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-1/4 h-40 bg-white rounded-md flex items-center justify-center">
                        <img
                          className="w-full h-full object-contain"
                          src={imageSrc}
                          alt={item.title || 'Product'}
                        />
                      </div>

                      <div className="flex flex-col sm:w-2/4 ">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.gender} {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">{item.category}</p>
                          <p className="text-sm text-gray-600">
                            Size: {item.size}
                          </p>
                        </div>

                        <div className="flex justify-start gap-6 mt-auto text-gray-500">
                          <p>Free Shipping + Free Returns</p>
                        </div>

                        <div className="mt-4 flex space-x-4">
                          <button className="text-sm text-gray-600 hover:text-teal-600">
                            Save for Later
                          </button>
                          <button
                            className="text-sm text-gray-600 hover:text-red-600"
                            onClick={() => removeItem(itemId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="sm:w-1/4">
                        <div className="flex lg:flex-col h-full justify-between items-center">
                          <div>
                            <p className="text-gray-900 font-medium lg:mt-0 mt-9">
                              ${item.price}
                            </p>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantity
                            </label>
                            <select
                              className="border border-gray-300 rounded-md h-10 w-16 px-2"
                              value={itemId ? quantities[itemId] || 1 : 1}
                              onChange={(e) =>
                                updateQuantity(itemId, Number(e.target.value))
                              }
                            >
                              {[...Array(10)].map((_, idx) => (
                                <option key={idx + 1} value={idx + 1}>
                                  {idx + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="mt-4">
                            <p className="text-gray-500">Total</p>
                            <p className="font-medium">
                              ${getItemSubtotal(item).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="flex flex-col lg:w-5/12 w-full">
              <div className="border border-gray-200 bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="flex flex-col w-full my-3 gap-2">
                  <div className="flex flex-row justify-between items-center py-2">
                    <p>Subtotal</p>
                    <p className="">${subTotal.toFixed(2)}</p>
                  </div>
                  <hr className="w-full bg-gray-300 h-[1px] border-0" />

                  <div className="flex flex-row justify-between items-center py-2">
                    <p>Shipping</p>
                    <p className="">FREE</p>
                  </div>
                  <hr className="w-full bg-gray-300 h-[1px] border-0" />

                  <div className="flex flex-row justify-between items-center py-2">
                    <p>Tax</p>
                    <p className="">${tax.toFixed(2)}</p>
                  </div>
                  <hr className="w-full bg-gray-300 h-[1px] border-0" />

                  <div className="flex justify-between items-center py-2">
                    <h2 className="font-semibold">Estimated Total</h2>
                    <h2 className="font-semibold text-lg">
                      USD ${total.toFixed(2)}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={navigateToCheckout}
                  className="border border-none bg-red-500 text-white w-full py-3 rounded hover:bg-opacity-75 mt-4"
                >
                  Proceed to Checkout
                </button>

                <p className="mt-4 text-xs text-center text-gray-500">
                  Secure checkout. Free returns within 30 days.
                </p>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="border border-none w-3/4 mt-10 bg-white text-center">
            <h1 className="text-2xl font-semibold pt-6">Your Cart is empty</h1>
            <p className="pt-5 pb-4">
              Check your Saved for later items below or{' '}
              <span
                onClick={navigateToHome}
                className="text-blue-400 hover:cursor-pointer"
              >
                continue shopping
              </span>
            </p>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </main>
  );
};

export default CartPage;