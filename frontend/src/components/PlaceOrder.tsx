import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface PlaceOrderProps {
  checkArr: any[];
  setCheckArr: (arr: any[]) => void;
  onBack?: () => void;
  handlePlaceOrder: () => Promise<void>;
}

interface OrderItem {
  id: string | number;
  title: string;
  src: string;
  quantity: number;
  price: number;
}

const PlaceOrder: React.FC<PlaceOrderProps> = ({ handlePlaceOrder }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [addressData, setAddressData] = useState({
    address: '',
    city: '',
    zipcode: '',
    country: 'USA',
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedAddress = localStorage.getItem('address');
    const savedCartInfo = localStorage.getItem('cartItems');
    const savedQuantities = localStorage.getItem('cartQuantities');

    if (savedName) {
      setName(savedName);
    }

    if (savedAddress) {
      try {
        // Parse the JSON string back to an object
        const addressObj = JSON.parse(savedAddress);
        setAddressData(addressObj);
      } catch (error) {
        console.error('Error parsing saved address:', error);
      }
    }

    let quantitiesObj: { [key: string]: number | undefined } = {};
    if (savedQuantities) {
      try {
        quantitiesObj = JSON.parse(savedQuantities);
        setQuantities(quantitiesObj);
      } catch (error) {
        console.error('Error parsing saved quantities:', error);
      }
    }

    if (savedCartInfo) {
      try {
        const parsedCartItems = JSON.parse(savedCartInfo);

        // Update items with their quantities
        const itemsQuantities = parsedCartItems.map(
          (item: { id: string | number }) => {
            const itemQuantity =
              item.id && quantitiesObj[item.id] !== undefined
                ? quantitiesObj[item.id]
                : 1;

            return {
              ...item,
              quantity: itemQuantity,
            };
          }
        );

        setOrderItems(itemsQuantities);

        // Calculate totals
        const calculatedSubTotal = itemsQuantities.reduce(
          (sum: number, item: { price: number; quantity: number }) =>
            sum + item.price * item.quantity,
          0
        );
        setSubTotal(calculatedSubTotal);
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
  }, []);

  // Format the address for display
  const formattedAddress = () => {
    if (!addressData.address) return '';

    return `${addressData.address}, ${addressData.city}, ${addressData.zipcode}, ${addressData.country || 'USA'}`;
  };

  const userInfo = {
    paymentMethod: 'Stripe',
  };

  const taxRate = 0.07;
  const tax = Math.round(subTotal * taxRate * 100) / 100;
  const total = subTotal + tax;

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
          </div>

          <div className="border border-gray-200 shadow-sm flex flex-col w-full my-3 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
            <p className="text-gray-700">{userInfo.paymentMethod}</p>
          </div>

          <div className="border border-gray-200 shadow-sm flex flex-col w-full my-3 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Order Items</h2>
            <div className="flex flex-row justify-between border-b border-gray-200 pb-2 font-medium text-gray-700">
              <p className="w-5/12">Item</p>
              <p className="w-3/12 text-center">Quantity</p>
              <p className="w-4/12 text-right">Price</p>
            </div>

            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-row justify-between py-3 border-b border-gray-100"
                >
                  <img
                    alt={item.title}
                    src={item.src}
                    className="w-10 object-contain mr-3"
                  />
                  <p className="w-5/12">{item.title}</p>
                  <p className="w-3/12 text-center mr-10">
                    {item.quantity || 1}
                  </p>
                  <p className="w-4/12 text-right">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-3 text-gray-500">No items in cart</p>
            )}
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
                <p className="font-semibold ">Total</p>
                <p className="font-semibold">${total.toFixed(2)} USD</p>
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
