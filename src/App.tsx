import { useState } from 'react'
import './App.css'
import Products from './data/Products'
import Home from './pages/Home'




interface Product {
  id: number;
  title: string;
  gender: string;
  category: string;
  price: string;
  size: string;
 }
 
 interface HomeProps {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
 }
 
 function App() {
  const [search, setSearch] = useState<string>('')
 
  return (
    <Home 
      products={Products.filter(product => 
        product.title.toLowerCase().includes(search.toLowerCase())
      )}
      search={search}
      setSearch={setSearch}
    />
  )
 }
 
 export default App
