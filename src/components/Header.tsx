import React, { useState } from 'react'
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import Logo from "../components/Logo"


interface Product {
  id: number;
  title: string;
  gender: string;
  category: string;
  price: string;
  size: string;
}


const Header = () => {
  const navigate = useNavigate();
  
  const navigateToHome = () => {
    navigate('/')
  }

  return (
    <header 
      onClick={navigateToHome}
      className=' flex flex-row sticky top-0 justify-between px-5 min-h-[80px] align-middle items-center bg-white z-50'>

    <div>
      <Logo />
    </div>

    <div >
      <ul>
        <li className='flex flex-row gap-5 font-semibold cursor-pointer '>
          <h2 className='hover:text-gray-500'>Women</h2>
          <h2 className='hover:text-gray-500'>Men</h2>
          <h2 className='hover:text-gray-500'>Accesories</h2>
          <h2 className='hover:text-gray-500'>Shoes</h2>
        </li>
      </ul>
    </div>

    <div className='flex flex-row gap-5 align-middle items-center'>
      <div className='flex flex-row gap-5 text-2xl'>
        <IoPersonOutline />
        <IoMdHeartEmpty />
        <MdOutlineShoppingBag />
      </div>
      
    </div>

  </header>
  )
}

export default Header;
