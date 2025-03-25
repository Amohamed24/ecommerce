import React, { useState } from 'react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      image:
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      title: 'ENGINEERED FOR MOVEMENT',
      description: 'Technical clothing designed for your active lifestyle',
      buttonText: 'SHOP NEW ARRIVALS',
      textPosition: 'left',
    },
    {
      image:
        'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      title: '25% OFF COLLECTIONS',
      description: 'Limited time offer on premium styles',
      buttonText: 'SHOP THE SALE',
      textPosition: 'right',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const current = banners[currentSlide];
  const textAlignment =
    current.textPosition === 'left'
      ? 'items-start text-left pl-16'
      : 'items-end text-right pr-16';

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-500">
        <img
          src={current.image}
          alt="Fashion model"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Text Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-center ${textAlignment} text-white`}
      >
        <h2 className="lg:text-5xl font-light tracking-wider mb-4">
          {current.title}
        </h2>
        <p className="lg:text-xl mb-8 max-w-md">{current.description}</p>
        <button className="bg-white text-black py-3 px-8 hover:bg-gray-200 transition duration-300 text-sm tracking-wider">
          {current.buttonText}
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
