import React, { useState } from 'react';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-8">
      <section className="border border-gray-200 shadow-sm flex flex-col w-full max-w-md mx-auto p-6 rounded-xl bg-white">
        <h1 className="font-semibold text-3xl">Payment Method</h1>
        <h3 className="my-3">Please select a payment method</h3>

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
            className="border border-none bg-teal-400 text-white w-full py-3 rounded hover:bg-opacity-75 my-4"
          >
            {loading ? 'Registering...' : 'Continue'}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Payment;
