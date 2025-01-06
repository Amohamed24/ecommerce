import React from 'react'

const SideBar = () => {
  return (
    <section className='flex flex-col w-2/12 min-h-screen m-5 bg-white justify-around px-5 pb-5 ml-5'>
        <div>
        <p className='text-sm underline mb-10 -mt-20 font-semibold'>Men's Clothes</p>
        <p className='flex flex-col text-[1rem]'>
            Showing 9 of 24 results for: 
            <span 
                className='text-xl font-semibold mt-1'>Men's Dress Pants
            </span>
        </p>
        </div>

        <div>
            <h2>Gender</h2>
            <div className='flex flex-row gap-2'>
                <input
                    id='checkbox'
                    type='checkbox'
                ></input>
                <p>Men</p>
            </div>

            <div className='flex flex-row gap-2'>
                <input
                    id='checkbox'
                    type='checkbox'
                ></input>
                <p>Women</p>
            </div>
        </div>

        <div>
            <h2>Category</h2>
            <div className='flex flex-row gap-2'>
                <input
                    id='checkbox'
                    type='checkbox'
                ></input>
                <p>Pants</p>
            </div>

            <div className='flex flex-row gap-2'>
                <input
                    id='checkbox'
                    type='checkbox'
                ></input>
                <p>Shirts</p>
            </div>

            <div className='flex flex-row gap-2'>
                <input
                    id='checkbox'
                    type='checkbox'
                ></input>
                <p>Jackets</p>
            </div>

            <div className='flex flex-row gap-2'>
                <input
                    id='checkbox'
                    type='checkbox'
                ></input>
                <p>Sweaters</p>
            </div>

            <div className='flex flex-row gap-2'>
                <input
                    id='checkbox'
                    type='checkbox'
                ></input>
                <p>Shirts</p>
            </div>
        </div>
  </section>
  )
}

export default SideBar
