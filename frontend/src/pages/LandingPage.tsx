import React from 'react';
import Header from '../components/Header';
import { LandingPageComponentProps } from '../types/types';
import NewProductsList from '../components/NewProductsList';
import HeroBanner from '../components/HeroBanner';

const LandingPage: React.FC<LandingPageComponentProps> = ({
  count,
  setCount,
  products,
  starRating,
}) => {
  return (
    <main>
      <section className="min-h-screen bg-gray-50">
        <Header
          search=""
          setSearch={() => {}}
          products={[]}
          count={count || 0}
          setCount={setCount || (() => {})}
        />

        <div className="w-3/4 m-auto">
          <HeroBanner />
        </div>
        
        <div className="max-w-[1200px] m-auto mt-16 px-4">
          <h1 className="text-2xl mb-8">NEWEST ARRIVALS</h1>
          <NewProductsList products={products} starRating={starRating} />
        </div>

        <footer className="w-full m-auto py-8 mt-16 border-t border-gray-200">
          <div className="max-w-[1200px] m-auto px-4">
            <p className="text-center text-gray-600">© 2025 PulsePoint. All Rights Reserved</p>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default LandingPage;