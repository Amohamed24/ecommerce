import { useState, useEffect } from 'react';
import './App.css';
import Products from './data/Products';
import Home from './pages/HomePage';
import Checkout from './pages/CheckoutPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import { ProductDetailsProps } from './types/types';
import { FaStar } from 'react-icons/fa';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import LandingPage from './pages/LandingPage';
import NewProducts from './data/NewProducts';

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
  // Add this with your other state variables
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  const loadUserCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/user/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.cart && data.cart.length > 0) {
        // Convert backend cart items to match your product format
        const backendCart = data.cart
          .map((item: any) => {
            const product = [...Products, ...NewProducts].find(
              (p) => p.id.toString() === item.productId
            );

            if (product) {
              return {
                ...product,
                quantity: item.quantity,
              };
            }
            return null;
          })
          .filter(Boolean);

        // Update state and localStorage
        setCheckArr(backendCart);
        setCount(backendCart.length);
        localStorage.setItem('cartItems', JSON.stringify(backendCart));
        localStorage.setItem('itemCount', JSON.stringify(backendCart.length));
      }
    } catch (error) {
      console.error('Error loading user cart:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadUserCart();
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />}></Route>
        <Route
          path="/signinpage"
          element={
            <SignInPage
              setIsLoggedIn={setIsLoggedIn}
              loading={false} 
            />
          }
        ></Route>
        <Route
          path="/landingpage"
          element={
            <LandingPage
              count={count}
              setCount={setCount}
              products={NewProducts}
              starRating={starRating}
            />
          }
        ></Route>
        <Route
          path="/home"
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
