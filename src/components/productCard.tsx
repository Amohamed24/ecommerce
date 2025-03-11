import Products from '../data/Products';
import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  title: string;
  category: string;
  gender: string;
  price: number;
  size: string;
  alt: string;
  src: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  category,
  gender,
  price,
  size,
  alt,
  src,
}) => {
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/ProductDetails/${id}`);
  };

  const fillHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeart(!heart);
  };

  return (
    <>
      <div>
        <section
          onClick={navigateToDetails}
          className="flex flex-col w-[21rem] h-[30rem] my-3 rounded-xl shadow-lg transition-transform hover:scale-105 bg-white border border-gray-200 hover:cursor-pointer"
        >
          <div className="relative w-full h-[21rem] overflow-hidden rounded-t-xl bg-teal-200">
            <img alt={title} src={src} className="w-full h-full object-cover" />
            <div
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
              onClick={fillHeart}
            >
              {heart ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <CiHeart className="w-6 h-6 text-gray-700 hover:text-red-500" />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between h-1/6 w-full px-4 py-3">
            {/* Title and Price */}
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg text-gray-900 truncate">
                {title}
              </h1>
              <p className="text-gray-700 font-medium">${price}</p>
            </div>
            <div className="text-gray-400">{category}</div>
            <div className="text-gray-400">{gender}</div>

            {/* <button
                            className="mt-4 w-full py-3 bg-teal-500 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-teal-600 transition-colors"
                        >
                            Add to Cart
                        </button> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductCard;
