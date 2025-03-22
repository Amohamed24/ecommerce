import { MdOutlineShoppingBag } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { HeaderProps } from '../types/types';
import { useEffect, useState } from 'react';

const Header = ({ count, setCount }: HeaderProps) => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState('');



  useEffect(() => {
    // Get the token and name from localStorage
    const token = localStorage.getItem('token');
    const savedName = localStorage.getItem('name');
    
    console.log("Token on load:", token);
    console.log("Name from localStorage:", savedName);
    
    // Set the name state if it exists in localStorage
    if (savedName) {
      setName(savedName);
    }
  }, []);


  const navigateToHome = () => {
    navigate('/home');
  };

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

  const logOut = () => {
    // Save cart items before logging out
    const currentCart = localStorage.getItem('cartItems');
    const currentCount = count;

    // Clear token (log out)
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    // Store cart info with user identifier
    if (currentCart) {
      localStorage.setItem('savedCartItems', currentCart);
      localStorage.setItem('savedCartCount', currentCount.toString());
    }

    if (setCount) {
      setCount(0);
    }

    localStorage.removeItem('cartItems');
    setIsModal(false);
    navigate('/');
  };

  const userDropDown = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setIsModal(!isModal);
  };

  return (
    <header className="flex flex-row sticky top-0 border justify-between px-40 min-h-[80px] align-middle items-center bg-white z-50">
      <div onClick={navigateToHome}>
        <Logo />
      </div>

      <div>
        <ul>
          <li className="flex flex-row text-center gap-5 font-semibold cursor-pointer">
            <h2 className="hover:text-gray-500">Women</h2>
            <h2 className="hover:text-gray-500">Men</h2>
            <h2 className="hover:text-gray-500">Accessories</h2>
            <h2 className="hover:text-gray-500">Shoes</h2>
          </li>
        </ul>
      </div>

      <div className="flex flex-row gap-5 align-middle items-center">
        <div className="flex flex-row gap-5 text-2xl">
          <div className="relative cursor-pointer" onClick={navigateToCheckout}>
            <MdOutlineShoppingBag className="text-2xl" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex justify-center items-center bg-red-500 text-white text-xs w-5 h-5 rounded-full">
                {count}
              </span>
            )}
          </div>

          <IoMdHeartEmpty />
          <div onClick={userDropDown} className="hover:cursor-pointer">
            {
              
            }
            <IoPersonOutline />
          </div>
        </div>
      </div>

      {isModal && (
        <div className="border w-40 h-20 bg-white flex flex-col absolute top-[5.5rem] right-24 rounded-xl">
          <div className="flex items-center justify-center border border-none w-full h-10">
            <p>Hi {name}!</p>
          </div>

          <hr></hr>
          <div className="flex items-center justify-center border border-none w-full h-10 hover:bg-slate-100 hover:cursor-pointer">
            <p onClick={logOut}>Log Out</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
