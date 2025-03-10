import { useState } from 'react';
import './App.css';
import Products from './data/Products';
import Home from './pages/Home';
import Checkout from './pages/checkout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [search, setSearch] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={Products.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
              )}
              search={search}
              setSearch={setSearch}
            />
          }
        ></Route>
        <Route
          path="/ProductDetails/:id"
          element={
            <ProductDetails
              products={Products}
              search={search}
              setSearch={setSearch}
            />
          }
        ></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
