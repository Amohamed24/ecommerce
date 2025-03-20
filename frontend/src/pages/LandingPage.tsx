import React from 'react';
import Header from '../components/Header';
import { LandingPageComponentProps } from '../types/types';
import NewProductsList from '../components/NewProductsList';
import HeroBanner from '../components/HeroBanner';
import { useNavigate } from 'react-router-dom';
import { PiHeadset } from 'react-icons/pi';
import { MdAttachMoney } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa";




const LandingPage: React.FC<LandingPageComponentProps> = ({
  count,
  setCount,
  products,
  starRating,
}) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  return (
    <main>
      <section className="min-h-screen bg-gray-100">
        <Header
          search=""
          setSearch={() => {}}
          products={[]}
          count={count || 0}
          setCount={setCount || (() => {})}
        />

        <div className="w-3/4 m-auto mt-5">
          <HeroBanner />
        </div>

        <div className="max-w-[1200px] m-auto mt-16 px-4">
          <h1 className="text-2xl font-semibold mb-8 mx-10">NEWEST ARRIVALS</h1>
          <NewProductsList products={products} starRating={starRating} />

          <div className="text-center mt-10">
            <button
              onClick={navigateToHome}
              className="border bg-black text-white px-6 py-3 rounded hover:bg-opacity-70"
            >
              View All Products
            </button>
          </div>
        </div>

        <section className="flex lg:flex-row md:flex-row  flex-col justify-between border border-gray-300 p-5 rounded-xl my-10 mx-20">
          <div>
            <FiShoppingBag size={25}/>
            <h2 className='my-2'>Free Shipping</h2>
            <h3>Free shipping on all orders</h3>
          </div>
          <div>
            <MdAttachMoney size={25}/>
            <h2 className='my-2'>Money Back Guarantee</h2>
            <h3>Within 30 days of purchase</h3>
          </div>
          <div>
            <FaRegCreditCard size={25}/>
            <h2 className='my-2'>Flexible Payment</h2>
            <h3>Pay with credit card, PayPal or Stripe</h3>
          </div>
          <div>
            <PiHeadset size={25}/>
            <h2 className='my-2'>24/7 Support</h2>
            <h3>Get support at any time</h3>
          </div>
        </section>

        <footer className="w-full m-auto py-6 border-t border-gray-300">
          <div className="max-w-[1200px] m-auto px-4">
            <p className="text-center text-gray-600">
              © 2025 PulsePoint. All Rights Reserved
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default LandingPage;
