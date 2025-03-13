import React from 'react';
import { IoFitnessSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1
        onClick={navigateToHome}
        className="flex flex-row-reverse align-middle items-center gap-1 font-semibold cursor-pointer text-teal-400"
      >
        PulsePoint
        <span>
          <IoFitnessSharp />
        </span>
      </h1>
    </div>
  );
};

export default Logo;
