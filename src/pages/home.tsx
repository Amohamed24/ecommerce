import React from 'react'
import ProductList from '../components/ProductList'
import Header from '../components/Header'
import SideBar from '../components/SideBar'


interface Products {
  id: number;
  title: string;     
  category: string;  
  gender: string;    
  price: string;     
  size: string;
}


interface HomeProps {
  products: Products[];
  search: string;
  setSearch: (value: string) => void;
}

const Home = ({ search, setSearch, products }: HomeProps) => {

  return (
    <main>
      <section className='min-h-screen bg-gray-100'>
        <Header 
          search={search}
          setSearch={setSearch}  
          products={products}
        />
        

        <div className='flex flex-row'>
          <SideBar />
          <ProductList 
          />
        </div>
        
      </section>
    </main>
  )
}

export default Home;
