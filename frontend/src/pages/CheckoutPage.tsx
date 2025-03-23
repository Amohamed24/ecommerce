import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutProps } from '../types/types';
import Header from '../components/Header';

const Checkout: React.FC<CheckoutProps> = ({
  checkArr,
  setCheckArr,
  count,
  setCount,
  search,
  setSearch,
  products,
  addToCart,
}) => {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    checkArr?.reduce(
      (acc, item) => {
        if (item.id) {
          acc[item.id] = 1;
        }
        return acc;
      },
      {} as { [key: number]: number }
    ) || {}
  );

  const navigateToHome = () => {
    navigate('/home');
  };

  const updateQuantity = async (
    productId: number | undefined,
    newQuantity: number
  ) => {
    if (productId !== undefined) {
      setQuantities({
        ...quantities,
        [productId]: newQuantity,
      });

      // If user is logged in, then update quantity in backend
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch('http://localhost:5001/api/user/update-cart-quantity', {
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

  const removeItem = (productId: number | undefined) => {
    if (productId !== undefined && setCheckArr) {
      // Remove the item from checkArr
      const updatedCart = checkArr.filter((item) => item.id !== productId);
      setCheckArr(updatedCart);

      // Update quantities object
      const newQuantities = { ...quantities };
      delete newQuantities[productId];
      setQuantities(newQuantities);

      // Decrease count
      const newCount = count - 1;
      setCount(newCount);

      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      localStorage.setItem('itemCount', JSON.stringify(newCount));
    }
  };

  const getItemSubtotal = (item: any) => {
    const price = Number(item.price) || 0;
    const qty = item.id ? quantities[item.id] || 1 : 1;
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
      return count + (item.id ? quantities[item.id] || 1 : 1);
    }, 0) || 0;

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header
        search=""
        setSearch={() => {}}
        products={products}
        count={count}
        setCount={setCount}
        addToCart={addToCart}
      />

      {checkArr && checkArr.length > 0 ? (
        <div className="flex flex-row m-auto gap-0 bg-gray-100">
          <section className="w-full flex flex-col mx-5 mt-20">
            <h1 className="font-bold mb-10 mx-5">
              My Bag:{' '}
              <span className="font-normal">
                ({totalItems} Item{totalItems > 1 ? 's' : ''})
              </span>
            </h1>

            {checkArr.map((item, index) => (
              <div key={`${item.id}-${index}`}>
                <div className="flex flex-row">
                  <div className="relative w-full h-[18rem] overflow-hidden mr-10 bg-white">
                    <img
                      className="w-full h-full object-contain"
                      src={item.src}
                      alt={item.title || 'Product'}
                    />
                  </div>

                  <div className="flex flex-col w-5/12">
                    <div className="">
                      <p className="font-semibold">
                        {item.gender} {item.title}
                      </p>
                      <p>{item.category}</p>
                      <p>{item.size}</p>
                    </div>

                    <div className="flex justify-start gap-6 mt-auto text-gray-500">
                      <p>Free Shipping + Free Returns</p>
                    </div>
                  </div>

                  <div className="flex flex-col w-10/12">
                    <div className="flex flex-row justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold">Item Price</p>
                        <p className="text-lg">${item.price}</p>
                      </div>

                      <div className="flex flex-col items-center align-middle">
                        <label className="font-semibold mb-1">Quantity</label>
                        <select
                          className="border border-black h-10 w-14 text-center"
                          value={item.id ? quantities[item.id] || 1 : 1}
                          onChange={(e) =>
                            updateQuantity(item.id, Number(e.target.value))
                          }
                        >
                          {[...Array(10)].map((_, idx) => (
                            <option key={idx + 1} value={idx + 1}>
                              {idx + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <p className="font-semibold">Total Price</p>
                        <p className="text-lg">
                          ${getItemSubtotal(item).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-6 mt-auto">
                      <button className="hover:text-blue-500 underline">
                        Save for Later
                      </button>
                      <button
                        className="hover:text-red-500 underline"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="w-full my-10 bg-gray-300 h-[1px] border-0"></hr>
              </div>
            ))}
          </section>

          <section className="flex flex-col w-5/12 mx-10 mt-20">
            <h1 className="font-bold">Order Summary</h1>
            <div className="flex flex-col w-full my-5">
              <div className="flex flex-row justify-between items-center px-4 py-2">
                <p>Subtotal</p>
                <p className="text-lg">${subTotal.toFixed(2)}</p>
              </div>
              <hr className="w-full bg-gray-300 h-[1px] border-0" />

              <div className="flex flex-row justify-between items-center px-4 py-2">
                <p>Shipping</p>
                <p className="text-lg">FREE</p>
              </div>
              <hr className="w-full bg-gray-300 h-[1px] border-0" />

              <div className="flex flex-row justify-between items-center px-4 py-2">
                <p>Tax</p>
                <p className="text-lg">${tax.toFixed(2)}</p>
              </div>
              <hr className="w-full bg-gray-300 h-[1px] border-0" />

              <div className="flex flex-row justify-between items-center px-4 py-2">
                <h2 className="font-semibold">Estimated Total</h2>
                <h2 className="font-semibold text-lg">
                  USD ${total.toFixed(2)}
                </h2>
              </div>
            </div>

            <button className="px-10 py-5 text-lg rounded-[10px] w-full font-semibold bg-red-600 text-white hover:bg-red-800 border-none">
              CHECKOUT
            </button>
          </section>
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
    </main>
  );
};

export default Checkout;
