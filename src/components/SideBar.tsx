import React, { useState } from 'react';
import Products from '../data/Products';
import { ProductDetailsProps } from '../types/types';

interface SideBarProps {
  setFilteredProducts: (products: ProductDetailsProps[]) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setFilteredProducts }) => {
  const [selectedGender, setSelectedGender] = useState<'Men' | 'Women' | null>(
    'Men'
  );

  const filteredProducts = selectedGender
    ? Products.filter((product) => product.gender === selectedGender)
    : Products;

  const totalProductAmount = Products.length;
  const filteredCount = filteredProducts.length;

  const handleGenderChange = (gender: 'Men' | 'Women') => {
    if (gender === selectedGender) {
      setSelectedGender(null);
      setFilteredProducts(Products);
    } else {
      setSelectedGender(gender);
      setFilteredProducts(
        Products.filter((product) => product.gender === gender)
      );
    }
  };

  return (
    <section className="sticky left-0 top-24 flex flex-col w-[20rem] bg-white ml-10 mt-5 h-full py-5 px-3 z-50">
      <div>
        <p className="text-sm underline font-semibold mb-5">
          {selectedGender ? `${selectedGender}'s` : 'All'} Clothes
        </p>
        <p className="flex flex-col text-[1rem]">
          Showing {filteredCount} of {totalProductAmount} for:
          <span className="text-xl font-semibold mt-1">
            {selectedGender ? `${selectedGender}'s` : 'All'} Clothing
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

      {/* <div>
        <hr className="my-5 "></hr>
        <h2>Size</h2>
        <div>
          <button className="border px-2 py-1 text-sm border-gray-400 hover:border-black rounded-[10%] cursor-pointer m-2">
            XS
          </button>
          <button className="border px-2 py-1 text-sm border-gray-400 hover:border-black rounded-[10%] cursor-pointer m-2">
            S
          </button>
          <button className="border px-2 py-1 text-sm border-gray-400 hover:border-black rounded-[10%] cursor-pointer m-2">
            M
          </button>

          <button className="border px-2 py-1 text-sm border-gray-400 hover:border-black rounded-[10%] cursor-pointer m-2">
            L
          </button>
          <button className="border px-2 py-1 text-sm border-gray-400 hover:border-black rounded-[10%] cursor-pointer m-2">
            XL
          </button>
          <button className="border px-2 py-1 text-sm border-gray-400 hover:border-black rounded-[10%] cursor-pointer m-2">
            XXL
          </button>
        </div>
      </div> */}

      <div>
        <hr className="my-5"></hr>
        <h2>Category</h2>
        <div className="flex flex-row gap-2 mt-2">
          <input
            id="pants-checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <label htmlFor="pants-checkbox">Pants</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="shirts-checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <label htmlFor="shirts-checkbox">Shirts</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="jackets-checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <label htmlFor="jackets-checkbox">Jackets</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="sweaters-checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <label htmlFor="sweaters-checkbox">Sweaters</label>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="accessories-checkbox"
            type="checkbox"
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
