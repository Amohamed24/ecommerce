import { useState, useEffect } from 'react';
import './App.css';
import Products from './data/Products';
import Home from './pages/home';
import Checkout from './pages/checkout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import { ProductDetailsProps } from './types/types';
import { FaStar } from 'react-icons/fa';

function App() {
  const [search, setSearch] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [checkArr, setCheckArr] = useState<ProductDetailsProps[]>([]);
  const [listingData, setListingData] = useState<ProductDetailsProps | null>(
    null
  );
  const [filteredByGender, setFilteredByGender] = useState<
    ProductDetailsProps[]
  >(Products.filter((product) => product.gender === 'Men'));

  useEffect(() => {
    const savedArr = localStorage.getItem('cartItems');
    const savedCount = localStorage.getItem('itemCount');

    if (savedArr) {
      setCheckArr(JSON.parse(savedArr));
    }

    if (savedCount) {
      setCount(JSON.parse(savedCount));
    }
  }, []);

  const filteredProducts = filteredByGender.filter((product) =>
    product.alt.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = () => {
    if (listingData) {
      const productExists = checkArr.some((item) => item.id === listingData.id);

      if (!productExists) {
        const newArr = [...checkArr, listingData];
        setCheckArr(newArr);

        const newCount = count + 1;
        setCount(newCount);

        localStorage.setItem('cartItems', JSON.stringify(newArr));
        localStorage.setItem('itemCount', JSON.stringify(newCount));

      } else if (productExists) {
        window.alert('This item is already in your cart');
      }
    }
  };

  const starRating = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const fillPercentage = Math.max(0, Math.min(100, (rating - i) * 100));

      stars.push(
        <div key={i} className="relative inline-block">
          <FaStar className="text-gray-300" />

          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <FaStar className="text-yellow-400" />
          </div>
        </div>
      );
    }

    return <div className="flex">{stars}</div>;
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
              starRating={starRating}
              setFilteredByGender={setFilteredByGender}
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
              starRating={starRating}
            />
          }
        ></Route>
        <Route
          path="/checkout/"
          element={
            <Checkout
              products={filteredProducts}
              search={search}
              setSearch={setSearch}
              checkArr={checkArr}
              setCheckArr={setCheckArr}
              count={count}
              setCount={setCount}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;