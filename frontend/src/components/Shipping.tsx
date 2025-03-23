import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate()
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
  }, []);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <main className='flex justify-center items-center'> 
      <section className="flex flex-col h-[40rem] text-left p-10 mx-10 w-4/12">
        <h1 className="font-semibold">Shipping Address</h1>
        <h3>Please enter an address to ship to</h3>

        <form className="flex flex-col gap-1 mt-3">
          <p>Full Name</p>
          <label htmlFor="name"></label>
          <input
            type="name"
            id="name"
            placeholder={name}
            className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
            disabled
          />

          <p>Address</p>
          <label htmlFor="address"></label>
          <input
            type="name"
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Enter your address"
            className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
            required
          />

          <p>City</p>
          <label htmlFor="city"></label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter your city"
            className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
            required
          />

          <p>Zipcode</p>
          <label htmlFor="zipcode"></label>
          <input
            type="number"
            id="zipcode"
            value={formData.zipcode}
            onChange={(e) =>
              setFormData({ ...formData, zipcode: e.target.value })
            }
            placeholder="Enter your zipcode"
            className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
            required
          />

          <p>Country</p>
          <label htmlFor="country"></label>
          <input
            type="name"
            id="name"
            placeholder="United States"
            className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
            disabled
          />

          <button
            type="submit"
            disabled={loading}
            className="border border-none bg-black text-white w-full py-3 rounded hover:bg-opacity-75"
          >
            {loading ? 'Registering...' : 'Continue'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Shipping;
