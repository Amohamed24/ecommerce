import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

interface ShippingProps {
  onComplete?: () => void;
}

const Shipping: React.FC<ShippingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipcode: '',
  });

  useEffect(() => {
    const savedName = localStorage.getItem('name');

    if (savedName) {
      setName(savedName);
    }

    // Check for existing address data
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);
        setFormData(parsedAddress);
      } catch (e) {
        console.error('Error parsing saved address:', e);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem('address', JSON.stringify(formData));
    console.log('Address saved locally:', formData);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You need to be logged in to save your address');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5001/api/user/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          'Server responded with an error:',
          response.status,
          errorText
        );
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTimeout(() => {
          setLoading(false);
          toast.success('Address saved successfully!');

          if (onComplete) {
            onComplete();
          } else {
            navigate('/payment');
          }
        }, 1500);
      } else {
        toast.error(data.message || 'Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-1500px)] px-4 sm:px-6 lg:px-8 py-8">
      <section className="border border-gray-200 shadow-sm flex flex-col w-full max-w-md mx-auto p-6 rounded-xl bg-white">
        <h1 className="font-semibold">Shipping Address</h1>
        <h3>Please enter an address to ship to</h3>
        <form className="py-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="name"
              id="name"
              placeholder={name}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
              disabled
            />
          </div>

          <div>
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Enter your address"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Enter your city"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label htmlFor="zipcode">ZIP / Postal Code</label>
              <input
                type="text"
                id="zipcode"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.zipcode}
                onChange={(e) =>
                  setFormData({ ...formData, zipcode: e.target.value })
                }
                placeholder="94103"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-gray-50"
              disabled
            >
              <option>United States</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="border border-none bg-teal-400 text-white w-full py-3 rounded hover:bg-opacity-75"
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </div>

          <div className="text-xs text-center text-gray-500 mt-4">
            Your information is secured and encrypted
          </div>
        </form>
      </section>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => navigate('/cartPage')}
          className="text-sm font-medium text-teal-600 hover:text-teal-500"
        >
          ← Return to cart
        </button>
      </div>

      <ToastContainer />
    </main>
  );
};

export default Shipping;
