import { MdOutlineShoppingBag } from 'react-icons/md';
import { IoPersonOutline, IoSearchOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { HeaderProps } from '../types/types';
import { useEffect, useState } from 'react';

const Header = ({ count, setCount, search, setSearch }: HeaderProps) => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('name');

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

  const logOut = (e) => {
    e.stopPropagation();

    const currentCart = localStorage.getItem('cartItems');
    const currentCount = count;

    // Clear token (log out)
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('itemCount');

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

  const getInitials = () => {
    if (name) {
      return name.charAt(0);
    }
  };

  const userDropDown = (e) => {
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) return;

    setIsModal(!isModal);
  };

  return (
    <header className="flex flex-row sticky top-0 border justify-between px-40 min-h-[80px] align-middle items-center bg-white z-50">
      <div onClick={navigateToHome}>
        <Logo />
      </div>

      <div className="w-[30rem] relative my-4">
        <div className="relative flex items-center">
          <div className="absolute left-3 z-10">
            <div className="flex items-center justify-center bg-teal-400 rounded-full p-2 shadow-sm hover:bg-teal-500 transition-colors duration-200">
              <IoSearchOutline className="text-xl text-white" />
            </div>
          </div>
          <input
            type="text"
            role="searchbox"
            placeholder="Search products"
            className="border border-gray-100 rounded-full py-3 pl-16 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent shadow-sm bg-gray-50 hover:bg-white transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row gap-5 align-middle items-center text-center">
        <div className="flex flex-row gap-5 text-2xl items-center">
          <div className="relative cursor-pointer" onClick={navigateToCheckout}>
            <MdOutlineShoppingBag className="text-2xl" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex justify-center items-center bg-red-500 text-white text-xs w-5 h-5 rounded-full">
                {count}
              </span>
            )}
          </div>

          <IoMdHeartEmpty className="text-2xl" />
          {name ? (
            <div
              onClick={userDropDown}
              className="flex items-center justify-center hover:cursor-pointer h-8 w-8 rounded-full bg-teal-300 text-white"
            >
              <p className="text-lg">{getInitials()}</p>
            </div>
          ) : (
            <div
              onClick={userDropDown}
              className="flex items-center justify-center hover:cursor-pointer h-8 w-8"
            >
              <IoPersonOutline className="text-2xl" />
            </div>
          )}
        </div>
      </div>

      {isModal && (
        <div className="border w-40 h-20 bg-white flex flex-col absolute top-[5.5rem] right-24 rounded-xl">
          <div className="flex items-center justify-center border border-none w-full h-10">
            <p className="truncate overflow-hidden w-32 text-center">
              Hi {name}!
            </p>
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
