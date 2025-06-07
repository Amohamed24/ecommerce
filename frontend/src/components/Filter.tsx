import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SortOrder } from '../types/types';

interface FilterProps {
  sortOrder: SortOrder;
  setSortOrder: (o: SortOrder) => void;
}

const Filter: React.FC<FilterProps> = ({ sortOrder, setSortOrder }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDropdown = () => setIsDialogOpen((open) => !open);

  const choose = (o: SortOrder) => {
    setSortOrder(o);
    setIsDialogOpen(false);
  };

  return (
    <div className="relative flex lg:justify-end justify-center w-full bg-none mt-10 -mb-10 text-left px-20">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 border rounded-md flex items-center justify-between w-40"
      >
        Sort price:{' '}
        {sortOrder === 'none'
          ? ''
          : sortOrder === 'asc'
            ? 'Low→High'
            : 'High→Low'}
        {isDialogOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {isDialogOpen && (
        <div className="absolute  mt-12 w-40 bg-white shadow-lg rounded-md overflow-hidden z-20">
          <button
            className={`block w-full px-4 py-2 text-left ${sortOrder === 'none' ? 'font-semibold' : ''}`}
            onClick={() => choose('none')}
          >
            Original order
          </button>
          <button
            className={`block w-full px-4 py-2 text-left ${sortOrder === 'asc' ? 'font-semibold' : ''}`}
            onClick={() => choose('asc')}
          >
            Price: Low→High
          </button>
          <button
            className={`block w-full px-4 py-2 text-left ${sortOrder === 'desc' ? 'font-semibold' : ''}`}
            onClick={() => choose('desc')}
          >
            Price: High→Low
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
