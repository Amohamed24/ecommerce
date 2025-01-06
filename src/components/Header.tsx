import React from 'react'
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoFitnessSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Header = () => {
  return (
    <header className='flex flex-row justify-between px-5 py-3 align-middle items-center bg-white'>

    <div>
      <h1 className='flex flex-row-reverse align-middle items-center gap-1 font-semibold'>PulsePoint 
        <span>
          <IoFitnessSharp />
        </span>
      </h1>
    </div>

    <div >
      <ul>
        <li className='flex flex-row gap-5 font-semibold'>
          <h2>Women</h2>
          <h2>Men</h2>
          <h2>Accesories</h2>
          <h2>Shoes</h2>
        </li>
      </ul>
    </div>

    <div className='flex flex-row gap-5 align-middle items-center'>
      <input
        id='search'
        placeholder='Search'
        className='border border-black p-2 rounded pl-5'
      >
      </input>

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
