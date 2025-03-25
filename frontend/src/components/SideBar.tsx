'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Products from '../data/Products';
import { Product } from '../types/types';

interface SideBarProps {
  setFilteredProducts: (products: Product[]) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setFilteredProducts }) => {
  const [selectedGender, setSelectedGender] = useState<'Men' | 'Women' | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<
    'Shirts' | 'Pants' | 'Jackets' | 'Sweaters' | 'Accessories' | null
  >(null);

  const filteredProducts = useMemo(() => {
    let filtered = [...Products];

    if (selectedGender) {
      filtered = filtered.filter(
        (product) => product.gender === selectedGender
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filtered;
  }, [selectedGender, selectedCategory]);

  useEffect(() => {
    setFilteredProducts(filteredProducts);
  }, [filteredProducts, setFilteredProducts]);

  const filteredCount = filteredProducts.length;
  const totalProductAmount = Products.length;

  const handleGenderChange = (gender: 'Men' | 'Women') => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const handleCategoryChange = (
    category: 'Shirts' | 'Pants' | 'Jackets' | 'Sweaters' | 'Accessories'
  ) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <section className="sticky left-0 top-24 w-[20rem] bg-white ml-10 mt-5 h-full py-5 px-3 z-50 lg:block hidden">
      <div>
        <p className="text-sm underline font-semibold mb-5">
          {selectedGender ? `${selectedGender}'s` : 'All'} Clothes{' '}
          {selectedCategory ? ` / ${selectedCategory}` : null}
        </p>
        <p className="flex flex-col text-[1rem]">
          Showing {filteredCount} of {totalProductAmount} for:
          <span className="text-xl font-semibold mt-1">
            {selectedGender || selectedCategory ? (
              <span>
                {[
                  selectedGender ? `${selectedGender}'s` : null,
                  selectedCategory,
                ]
                  .filter(Boolean)
                  .join(' ')}
              </span>
            ) : (
              'All Products'
            )}
          </span>
        </p>
      </div>

      <div>
        <hr className="my-5"></hr>
        <h2>Gender</h2>

        <div className="flex flex-row gap-2 mt-2">
          <input
            type="checkbox"
            id="men-checkbox"
            checked={selectedGender === 'Men'}
            onChange={() => handleGenderChange('Men')}
            className="cursor-pointer"
          ></input>
          <label htmlFor="men-checkbox">Men</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            id="women-checkbox"
            checked={selectedGender === 'Women'}
            onChange={() => handleGenderChange('Women')}
            className="cursor-pointer"
          ></input>
          <label htmlFor="women-checkbox">Women</label>
        </div>
      </div>

      <div>
        <hr className="my-5"></hr>
        <h2>Category</h2>
        <div className="flex flex-row gap-2 mt-2">
          <input
            id="pants-checkbox"
            type="checkbox"
            checked={selectedCategory === 'Pants'}
            onChange={() => handleCategoryChange('Pants')}
            className="cursor-pointer"
          ></input>
          <label htmlFor="pants-checkbox">Pants</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="shirts-checkbox"
            type="checkbox"
            checked={selectedCategory === 'Shirts'}
            onChange={() => handleCategoryChange('Shirts')}
            className="cursor-pointer"
          ></input>
          <label htmlFor="shirts-checkbox">Shirts</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="jackets-checkbox"
            type="checkbox"
            checked={selectedCategory === 'Jackets'}
            onChange={() => handleCategoryChange('Jackets')}
            className="cursor-pointer"
          ></input>
          <label htmlFor="jackets-checkbox">Jackets</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="sweaters-checkbox"
            type="checkbox"
            checked={selectedCategory === 'Sweaters'}
            onChange={() => handleCategoryChange('Sweaters')}
            className="cursor-pointer"
          ></input>
          <label htmlFor="sweaters-checkbox">Sweaters</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="accessories-checkbox"
            type="checkbox"
            checked={selectedCategory === 'Accessories'}
            onChange={() => handleCategoryChange('Accessories')}
            className="cursor-pointer"
          ></input>
          <label htmlFor="accessories-checkbox">Accessories</label>
        </div>
      </div>

      <hr className="mt-5"></hr>
    </section>
  );
};

export default SideBar;
