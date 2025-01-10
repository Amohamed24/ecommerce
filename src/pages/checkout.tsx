import React from 'react'
import Logo from '../components/Logo'
import { IoPersonOutline } from "react-icons/io5";


const Checkout = () => {
  return (
    <main>
      <header className=' flex flex-row sticky top-0 justify-between min-h-[80px] align-middle items-center bg-white z-50 px-10'>        
        <Logo 
        />
        <IoPersonOutline className='text-2xl'/>
      </header>

      
      <div className="flex flex-row m-auto h-[calc(100vh-80px)] gap-0 bg-gray-100">
        <section className="w-full flex flex-col mx-5 mt-20">
          
          <h1 className='font-bold mb-10'>My Bag <span className='font-normal'>(1 Item)</span></h1>

          <div className='flex flex-row'>
            <div className="relative w-8/12 h-[18rem] overflow-hidden mr-10 bg-teal-200">
              <img
                className="w-full h-full object-cover" 
              />
            </div>

            <div className='flex flex-col w-full'>
              {/* Item Description*/}
              <div className=''>
                <h2>Airing Easy Short Sleeve-Shirt</h2>
                <p>Bright White</p>
                <p>Size L</p>
              </div>

              <div className='flex justify-start gap-6 mt-auto'>
                <p>Free Shipping + Free Returns</p>
              </div>
            </div>
            

            <div className="flex flex-col w-full">
              {/* Price and Quantity Section */}
              <div className="flex flex-row justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">Item Price</p>
                  <p>$88.00</p>
                </div>

                <div className="flex flex-col items-center align-middle">
                  <label className="font-semibold mb-1">Quantity</label>
                  <button className="border border-black h-10 w-20">1</button>
                </div>

                <div>
                  <p className="font-semibold">Total Price</p>
                  <p>$88.00</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-6 mt-auto">
                <button className="hover:text-blue-500 underline">Save for Later</button>
                <button className="hover:text-red-500 underline">Remove</button>
              </div>
            </div>
          </div>
          
          <hr className="w-full my-10 bg-gray-300 h-[1px] border-0"></hr>

            
        </section>

        <section className="flex flex-col w-5/12 mx-10 mt-20">
          <h1 className='font-bold'>Order Summary</h1>
          <div className="flex flex-col w-full my-5">

            <div className="flex flex-row justify-between items-center px-4 py-2">
              <p>Subtotal</p>
              <p>$216.00</p>
            </div>
            <hr className="w-full bg-gray-300 h-[1px] border-0" />

            <div className="flex flex-row justify-between items-center px-4 py-2">
              <p>Shipping</p>
              <p>FREE</p>
            </div>
            <hr className="w-full bg-gray-300 h-[1px] border-0" />

            <div className="flex flex-row justify-between items-center px-4 py-2">
              <p>Tax</p>
              <p>Calculated at checkout</p>
            </div>
            <hr className="w-full bg-gray-300 h-[1px] border-0" />

            <div className="flex flex-row justify-between items-center px-4 py-2">
              <h2 className="font-semibold">Estimated Total</h2>
              <h2 className="font-semibold">USD $216.00</h2>
            </div>
          </div>

          <button className='px-10 py-5 text-lg rounded-[10px] w-full font-semibold bg-red-600 text-white hover:bg-red-800 border-none'>CHECKOUT</button>

        </section>
      </div>
    </main>
  )
}

export default Checkout;
