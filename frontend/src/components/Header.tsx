import { MdOutlineShoppingBag } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { HeaderProps } from '../types/types';

const Header = ({ count }: HeaderProps) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <header className="flex flex-row sticky top-0 justify-between px-5 min-h-[80px] align-middle items-center bg-white z-50">
      <div onClick={navigateToHome}>
        <Logo />
      </div>

      <div>
        <ul>
          <li className="flex flex-row gap-5 font-semibold cursor-pointer">
            <h2 className="hover:text-gray-500">Women</h2>
            <h2 className="hover:text-gray-500">Men</h2>
            <h2 className="hover:text-gray-500">Accessories</h2>
            <h2 className="hover:text-gray-500">Shoes</h2>
          </li>
        </ul>
      </div>

      <div className="flex flex-row gap-5 align-middle items-center">
        <div className="flex flex-row gap-5 text-2xl">
          <IoPersonOutline />
          <IoMdHeartEmpty />
          <div className="relative cursor-pointer" onClick={navigateToCheckout}>
            <MdOutlineShoppingBag className="text-2xl" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex justify-center items-center bg-red-500 text-white text-xs w-5 h-5 rounded-full">
                {count}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
