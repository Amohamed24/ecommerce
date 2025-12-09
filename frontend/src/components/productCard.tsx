import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id?: number;
  _id?: string; // MongoDB ID
  title: string;
  category: string;
  gender: string;
  price: number;
  size: string;
  alt: string;
  src?: string; 
  image?: string[]; 
  description: string;
  rating: number;
  starRating?: (rating: number) => JSX.Element;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  _id,
  title,
  category,
  gender,
  price,
  alt,
  src,
  image,
  rating,
  starRating,
}) => {
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();

  const productId = _id || id;
  
  const imageSrc = image?.[0] || src || '';

  const navigateToDetails = () => {
    navigate(`/ProductDetails/${productId}`);
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
          className="flex flex-col lg:w-[21rem] lg:h-[30rem] rounded-xl shadow-lg transition-transform hover:scale-105 bg-white border border-gray-200 hover:cursor-pointer z-1 mx-3"
        >
          <div className="relative w-full h-[21rem] overflow-hidden rounded-t-xl">
            <img
              alt={alt}
              src={imageSrc}
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none z-10"
              onClick={fillHeart}
            >
              {heart ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <CiHeart className="w-6 h-6 text-gray-700 hover:text-red-500" />
              )}
            </button>
          </div>

          <div className="flex flex-col justify-between h-32 w-full px-4 py-3">
            {/* Title and Price */}
            <div className="flex justify-between items-start mb-1">
              <h1 className="font-medium text-lg text-gray-700 line-clamp-2">
                {alt || title}
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
