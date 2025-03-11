'use client';

import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { HomeProps } from '@/types/types';



const Home = ({
  search,
  setSearch,
  products,
  count,
  setCount,
  addToCart,
}: HomeProps) => {
  return (
    <main>
      <section className="min-h-screen bg-gray-100">
        <Header
          search={search}
          setSearch={setSearch}
          products={products}
          count={count}
          setCount={setCount}
          addToCart={addToCart}
        />

        <div className="flex flex-row">
          <SideBar />
          <ProductList 
          products={products}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
