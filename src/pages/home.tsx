import React from 'react'
import ProductList from './ProductList'
import Header from '../components/Header'


const Home = () => {
  return (
    <main>
      

      <section className='bg-gray-100'>
        <Header />
        <ProductList />
      </section>
    </main>
  )
}

export default Home;
