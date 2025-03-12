import { useState } from 'react';
import './App.css';
import Products from './data/Products';
import Home from './pages/Home';
import Checkout from './pages/checkout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import { ProductDetailsProps } from './types/types';

function App() {
  const [search, setSearch] = useState<string>('');
  const [addItem, setAddItem] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [checkArr, setCheckArr] = useState<ProductDetailsProps[]>([]);
  const [listingData, setListingData] = useState<ProductDetailsProps | null>(
    null
  );

  const filteredProducts = Products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = () => {
    if (listingData) {
      const productExists = checkArr.some((item) => item.id === listingData.id);

      if (!productExists) {
        const newArr = [...checkArr, listingData];
        setCheckArr(newArr);

        setCount(count + 1);

        console.log('Added to cart:', listingData.title);
        console.log('Cart contents:', newArr);
      } else if (productExists) {
        window.alert('This item is already in your cart');
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={filteredProducts}
              search={search}
              setSearch={setSearch}
              count={count}
              setCount={setCount}
              addToCart={addToCart}
            />
          }
        ></Route>
        <Route
          path="/ProductDetails/:id"
          element={
            <ProductDetails
              count={count}
              setCount={setCount}
              addToCart={addToCart}
              listingData={listingData}
              setListingData={setListingData}
            />
          }
        ></Route>
        <Route
          path="/checkout/"
          element={<Checkout checkArr={checkArr} setCheckArr={setCheckArr} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
