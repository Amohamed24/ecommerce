import Products from '../data/Products';
import React, { useState } from 'react';
import { CiHeart, CiStar } from 'react-icons/ci';
import { FaHeart, FaStar } from 'react-icons/fa';
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
  description: string;
  rating: number;
  starRating?: (rating: number) => JSX.Element;
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
  rating,
  starRating,
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
          <div className="relative w-full h-[21rem] overflow-hidden rounded-t-xl">
            <img
              alt={title}
              src={src}
              className="w-full h-full object-contain"
            />
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
              <h1 className="font-medium text-lg text-gray-700 text-wrap truncate leading-tight pb-3">
                {alt}
              </h1>
              <p className="text-gray-700 font-medium">${price}</p>
            </div>
            <div className="text-gray-400">
              {gender}'s {category}
            </div>
            <div className="flex items-center">
              {starRating !== undefined && starRating(rating)}
              <span className="ml-1 text-gray-500 text-sm">({rating})</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductCard;
