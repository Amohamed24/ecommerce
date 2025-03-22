import React, { useState } from 'react';
import Products from '../data/Products';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Filter = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  // This function sorts products based on the selected order
  const priceSort = () => {
    const sortedProducts = [...Products].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    console.log(sortedProducts);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleSortDropdown = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="flex flex-col h-10 w-40 absolute right-24 top-[7rem] bg-none z-10">
      <div
        className="flex flex-row align-middle justify-center items-center"
        onClick={toggleSortDropdown}
      >
        <p className="mr-3">Sort By</p>
        {isDialogOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>

      {/* Button to open filter dialog */}

      {isDialogOpen && (
        <div
          onClick={priceSort}
          className="bg-white h-80 w-40 text-center py-5 rounded-xl" 
        >
          <p
            className="hover:cursor-pointer hover:opacity-55 mb-2"
            onClick={toggleSortOrder}
          >
            {sortOrder !== 'asc'}Price: High-Low
          </p>
          <p
            className="hover:cursor-pointer hover:opacity-55"
            onClick={toggleSortOrder}
          >
            {sortOrder !== 'asc'}Price: Low-High
          </p>
        </div>
      )}
    </div>
  );
};

export default Filter;
