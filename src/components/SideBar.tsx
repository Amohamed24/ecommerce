import React, { useState } from 'react';
import Products from '../data/Products';
import ProductList from './ProductList';

const SideBar = () => {
  const [sort, setSort] = useState('');

  let itemLength = Products.length;

  const showMensProducts = true;

  const filteredGender = Products.filter((product) =>
    showMensProducts ? product.gender == 'Men' : product.gender != 'Men'
  );

  console.log(filteredGender);

  

  return (
    <section className="sticky left-0 top-24 flex flex-col w-[20rem] bg-white ml-10 mt-5 h-full py-5 px-3 z-50">
      <div>
        <p className="text-sm underline font-semibold mb-5">Men's Clothes</p>
        <p className="flex flex-col text-[1rem]">
          Showing {itemLength} results:
          <span className="text-xl font-semibold mt-1">Men's Dress Pants</span>
        </p>
      </div>

      <div>
        <hr className="my-5"></hr>
        <h2>Gender</h2>
        <div className="flex flex-row gap-2 mt-2">
          <input
            id="gender"
            type="checkbox"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          ></input>
          <p>Men</p>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="gender"
            type="checkbox"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          ></input>
          <p>Women</p>
        </div>
      </div>

      <div>
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
      </div>

      <div>
        <hr className="my-5"></hr>
        <h2>Category</h2>
        <div className="flex flex-row gap-2 mt-2">
          <input
            id="checked"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <p>Pants</p>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <p>Shirts</p>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <p>Jackets</p>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <p>Sweaters</p>
        </div>

        <div className="flex flex-row gap-2">
          <input
            id="checkbox"
            type="checkbox"
            className="cursor-pointer"
          ></input>
          <p>Shirts</p>
        </div>
      </div>

      <hr className="mt-5"></hr>
    </section>
  );
};

export default SideBar;
