import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [addressData, setAddressData] = useState({
    address: '',
    city: '',
    zipcode: '',
    country: 'USA',
  });

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedAddress = localStorage.getItem('address');

    if (savedName) {
      setName(savedName);
    }

    if (savedAddress) {
      try {
        // Parse the JSON string back to an object
        const addressObj = JSON.parse(savedAddress);
        setAddressData(addressObj);
        console.log('Loaded address from localStorage:', addressObj);
      } catch (error) {
        console.error('Error parsing saved address:', error);
      }
    }
  }, []);

  // Format the address for display
  const formattedAddress = () => {
    if (!addressData.address) return '';
    
    return `${addressData.address}, ${addressData.city}, ${addressData.zipcode}, ${addressData.country || 'USA'}`;
  };

  const userInfo = {
    name: 'John Doe',
    address: '123 Main St, St Paul 55104 USA',
    paymentMethod: 'Stripe',
  };

  const orderItems = [
    { id: 1, name: 'Product 1', quantity: 2, price: 49.99 },
    { id: 2, name: 'Product 2', quantity: 1, price: 0.02 },
  ];

  const subTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.07;
  const tax = Math.round(subTotal * taxRate * 100) / 100;
  const total = subTotal + tax;

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Order placed successfully!');
    }, 2000);
  };

  const EditButton = () => (
    <button
      type="button"
      className="border border-gray-300 bg-white text-gray-700 rounded px-4 py-1 hover:bg-gray-50 text-sm mt-2 w-2/12"
    >
      Edit
    </button>
  );

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold">Place Order</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Order Information */}
        <section className="flex flex-col w-full md:w-7/12">
          <div className="border border-gray-200 shadow-sm flex flex-col w-full my-3 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
            <p className="text-gray-700">{name}</p>
            <p className="text-gray-700">{formattedAddress()}</p>
            <EditButton />
          </div>

          <div className="border border-gray-200 shadow-sm flex flex-col w-full my-3 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
            <p className="text-gray-700">{userInfo.paymentMethod}</p>
            <EditButton />
          </div>

          <div className="border border-gray-200 shadow-sm flex flex-col w-full my-3 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
            <div className="flex flex-row justify-between border-b border-gray-200 pb-2 font-medium text-gray-700">
              <p className="w-5/12">Item</p>
              <p className="w-3/12 text-center">Quantity</p>
              <p className="w-4/12 text-right">Price</p>
            </div>

            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between py-3 border-b border-gray-100"
              >
                <p className="w-5/12">{item.name}</p>
                <p className="w-3/12 text-center">{item.quantity}</p>
                <p className="w-4/12 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column - Order Summary */}
        <section className="flex flex-col w-full md:w-5/12">
          <div className="border border-gray-200 shadow-sm flex flex-col w-full my-3 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <p className="text-gray-700">Subtotal</p>
                <p className="font-medium">${subTotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center py-2">
                <p className="text-gray-700">Shipping</p>
                <p className="font-medium">FREE</p>
              </div>

              <div className="flex justify-between items-center py-2">
                <p className="text-gray-700">Tax (7%)</p>
                <p className="font-medium">${tax.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center py-3 border-t border-gray-200 mt-2">
                <p className="font-semibold text-lg">Total</p>
                <p className="font-semibold text-lg">${total.toFixed(2)} USD</p>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="border border-none bg-black text-white w-full py-3 rounded hover:bg-opacity-75 mt-4"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
              <ToastContainer />

              <p className="text-center text-sm text-gray-500 mt-2">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PlaceOrder;
