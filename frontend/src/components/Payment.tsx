import React, { useState } from 'react';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  return (
    <main className="flex justify-center items-center">
      <section className='mt-16'>
        <h1 className="font-semibold text-3xl">Payment Method</h1>
        <h3 className='my-3'>Please select a payment method</h3>

        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <input id="html" name="radio-btn" type="radio" className="mr-2" />
            <label htmlFor="Paypal">PayPal</label>
          </div>

          <div>
            <input id="stripe" name="radio-btn" type="radio" className="mr-2" />
            <label htmlFor="Stripe">Stripe</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="border border-none bg-black text-white w-full py-3 rounded hover:bg-opacity-75 my-4"
          >
            {loading ? 'Registering...' : 'Continue'}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Payment;
