import React from 'react'
import ProductList from './ProductList'
import Header from '../components/Header'
import SideBar from '../components/SideBar'



interface HomeProps {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
}

const Home = ({ products, search, setSearch }: HomeProps) => {

  return (
    <main>
      <section className='min-h-screen bg-gray-100'>
        <Header 
          search={search}
          setSearch={setSearch}  
        />
        

        <div className='flex flex-row'>
          <SideBar />
          <ProductList 
            products={products}
          />
        </div>
        
      </section>
    </main>
  )
}

export default Home;
