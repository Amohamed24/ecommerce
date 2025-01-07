import React, { useState } from 'react'
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoFitnessSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import Search from './Search';
import { useNavigate } from "react-router-dom"


interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  const navigate = useNavigate();
  
  const navigateToHome = () => {
    navigate('/')
  }

  return (
    <header 
      onClick={navigateToHome}
      className=' flex flex-row sticky top-0 justify-between px-5 min-h-[80px] align-middle items-center bg-white z-50'>

    <div>
      <h1 className='flex flex-row-reverse align-middle items-center gap-1 font-semibold cursor-pointer'>PulsePoint 
        <span>
          <IoFitnessSharp />
        </span>
      </h1>
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
      <Search 
        search={search}
        setSearch={setSearch}

      />
      
      <div className='flex flex-row gap-5 text-2xl'>
        <IoPersonOutline />
        <IoMdHeartEmpty />
        <MdOutlineShoppingBag />
      </div>
      
    </div>

  </header>
  )
}

export default Header
