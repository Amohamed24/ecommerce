import { MdOutlineShoppingBag } from 'react-icons/md';
import {
  IoPersonOutline,
  IoSearchOutline,
  IoMenuOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { HeaderProps } from '../types/types';
import { useEffect, useState, useRef } from 'react';

const Header = ({ count, setCount, search, setSearch }: HeaderProps) => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');

    if (savedName) {
      setName(savedName);
    }

    if (savedEmail) {
      setEmail(savedEmail);
    }

    // Close modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when mobile search opens
  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const navigateToHome = () => {
    navigate('/home');
    setMobileMenuOpen(false);
  };

  const navigateToCheckout = () => {
    navigate('/cartPage');
    setMobileMenuOpen(false);
  };

  const logOut = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();

    const currentCart = localStorage.getItem('cartItems');
    const currentCount = count;
    const currentQuantities = localStorage.getItem('cartQuantities');

    // Clear token (log out)
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('itemCount');
    localStorage.removeItem('cartQuantities');

    // Store cart info with user identifier
    if (currentCart) {
      localStorage.setItem('savedCartItems', currentCart);
      localStorage.setItem('savedCartCount', currentCount.toString());
    }

    if (currentQuantities) {
      localStorage.setItem('savedQuantities', currentQuantities);
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

  const userDropDown = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) return;

    setIsModal(!isModal);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 border-b border-gray-200 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 p-2"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? (
                <IoCloseOutline className="h-6 w-6" />
              ) : (
                <IoMenuOutline className="h-6 w-6" />
              )}
            </button>
          </div>

          <div
            onClick={navigateToHome}
            className="flex-shrink-0 flex items-center cursor-pointer"
          >
            <Logo />
          </div>

          <div className="hidden md:block w-full max-w-md mx-4 lg:mx-8">
            <div className="relative flex items-center">
              <div className="absolute left-3 z-10">
                <div className="flex items-center justify-center bg-teal-400 rounded-full p-1.5 shadow-sm hover:bg-opacity-75 transition-colors duration-200">
                  <IoSearchOutline className="text-lg text-white" />
                </div>
              </div>
              <input
                type="text"
                role="searchbox"
                placeholder="Search products"
                className="border border-gray-100 rounded-full py-2 pl-12 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent shadow-sm bg-gray-50 hover:bg-white transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMobileSearch}
              className="p-2 text-gray-700"
              aria-label="Search"
            >
              <IoSearchOutline className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <div
              className="relative cursor-pointer"
              onClick={navigateToCheckout}
            >
              <MdOutlineShoppingBag className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex justify-center items-center bg-red-500 text-white text-xs w-5 h-5 rounded-full">
                  {count}
                </span>
              )}
            </div>

            <div className="hidden sm:block cursor-pointer">
              <IoMdHeartEmpty className="h-6 w-6" />
            </div>

            <div className="relative">
              {name ? (
                <div
                  onClick={userDropDown}
                  className="flex items-center justify-center hover:cursor-pointer h-8 w-8 rounded-full bg-teal-400 text-white"
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

              {isModal && (
                <div
                  ref={modalRef}
                  className="absolute right-0 top-full mt-2 w-52 bg-white rounded shadow-lg overflow-hidden border border-gray-100 z-50 text-left"
                >
                  <div className="py-2 px-4 border-b border-gray-100">
                    <p className="truncate overflow-hidden text-sm font-medium">
                      Hi, {name}!
                    </p>
                    <h3 className="truncate overflow-hidden text-sm text-gray-500 mt-1">
                      {email || 'no email'}
                    </h3>
                  </div>
                  <div
                    onClick={logOut}
                    className="py-2 px-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="text-sm">Sign Out</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (appears when search button is clicked) */}
      {mobileSearchOpen && (
        <div className="px-4 pb-4 md:hidden">
          <div className="relative flex items-center">
            <div className="absolute left-3 z-10">
              <div className="flex items-center justify-center bg-teal-400 rounded-full p-1.5 shadow-sm">
                <IoSearchOutline className="text-lg text-white" />
              </div>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              role="searchbox"
              placeholder="Search products"
              className="border border-gray-100 rounded-full py-2 pl-12 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent shadow-sm bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              onClick={(e) => {
                e.preventDefault();
                navigateToHome();
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Home
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                navigateToCheckout();
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Cart
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
