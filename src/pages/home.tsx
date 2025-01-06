import React from 'react'
import ProductList from './ProductList'
import Header from '../components/Header'
import SideBar from '../components/SideBar'


const Home = () => {
  return (
    <main>
      

      <section className='min-h-screen bg-gray-100'>
        <Header />

        <div className='flex flex-row'>
          <SideBar />
          <ProductList />
        </div>
        
      </section>
    </main>
  )
}

export default Home;
