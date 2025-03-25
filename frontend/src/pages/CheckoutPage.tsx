import React, { useState } from 'react';
import Header from '../components/Header';
import { CheckOutPageProps } from '../types/types';
import Shipping from '../components/Shipping';
import PlaceOrder from '../components/PlaceOrder';

const CheckoutPage: React.FC<CheckOutPageProps> = ({
  count,
  setCount,
  checkArr,
  setCheckArr,
  handlePlaceOrder,
}) => {
  const [checkoutStep, setCheckoutStep] = useState('shipping');

  const handleShippingComplete = () => {
    setCheckoutStep('placeOrder');
  };

  const handleBackToShipping = () => {
    setCheckoutStep('shipping');
  };

  return (
    <div>
      <Header
        search=""
        setSearch={() => {}}
        products={[]}
        count={count || 0}
        setCount={setCount || (() => {})}
      />

      {/* Checkout Steps */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                checkoutStep === 'shipping' || checkoutStep === 'placeOrder'
                  ? 'bg-teal-400 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              1
            </div>
            <span
              className={`text-xs mt-1 ${
                checkoutStep === 'shipping' || checkoutStep === 'placeOrder'
                  ? 'text-teal-400 font-medium'
                  : 'text-gray-500'
              }`}
            >
              Shipping
            </span>
          </div>

          <div className="h-1 flex-1 mx-2 bg-gray-200">
            <div
              className={`h-full ${
                checkoutStep === 'placeOrder' ? 'bg-teal-400 w-full' : 'w-0'
              } transition-all duration-300`}
            ></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                checkoutStep === 'placeOrder'
                  ? 'bg-teal-400 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              2
            </div>
            <span
              className={`text-xs mt-1 ${
                checkoutStep === 'placeOrder'
                  ? 'text-teal-600 font-medium'
                  : 'text-gray-500'
              }`}
            >
              Place Order
            </span>
          </div>
        </div>
      </div>

      {checkoutStep === 'shipping' && (
        <Shipping onComplete={handleShippingComplete} />
      )}

      {checkoutStep === 'placeOrder' && (
        <PlaceOrder
          checkArr={checkArr}
          setCheckArr={setCheckArr}
          onBack={handleBackToShipping}
          handlePlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
