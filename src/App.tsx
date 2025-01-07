import { useState } from 'react'
import './App.css'
import Products from './data/Products'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';



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
    <Router>
      <Routes>
        <Route path="/" 
        element={<Home 
          products={Products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())
            )}
            search={search}
            setSearch={setSearch}
        />}>
        </Route>
        <Route path="/ProductDetails"
          element={<ProductDetails />}
        ></Route>
      </Routes>
    </Router>
  )
 }
 
 export default App



