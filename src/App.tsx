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

  const addToCart = () => {
    if (count < 10) {
      setCount(count + 1);
    } else {
      window.alert('Max number of items is 10');
    }

    // Use listingData instead of newProduct
    if (listingData) {
      const newArr = [...checkArr, listingData];
      setCheckArr(newArr);
      console.log(newArr);
    }
  };

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
        <Route path="/checkout/" element={<Checkout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
