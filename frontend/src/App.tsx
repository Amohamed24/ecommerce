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
import { toast } from 'react-toastify';

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
    console.log(
      'App initialized, localStorage cart:',
      localStorage.getItem('cartItems')
    );
    console.log('Token in localStorage:', localStorage.getItem('token'));
  }, []);

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

  const addToCart = async () => {
    if (listingData) {
      const productExists = checkArr.some((item) => item.id === listingData.id);

      if (!productExists) {
        // Update the local state
        const newArr = [...checkArr, listingData];
        setCheckArr(newArr);

        const newCount = count + 1;
        setCount(newCount);

        localStorage.setItem('cartItems', JSON.stringify(newArr));
        localStorage.setItem('itemCount', JSON.stringify(newCount));

        // Sync with server if users is logged in
        const token = localStorage.getItem('token');
        if (token) {
          try {
            await fetch('http://localhost:5001/api/user/add-to-cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                productId: listingData.id.toString(),
                name: listingData.title,
                price: parseFloat(listingData.price),
                image: listingData.src,
                category: listingData.category,
                size: listingData.size,
              }),
            });
          } catch (error) {
            console.error('Error syncing cart with server:', error);
          }
        }
      } else if (productExists) {
        toast.error('This item is already in your cart');
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
      const response = await fetch('http://localhost:5001/api/user/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Loaded user cart from server:', data);

      if (data.success) {
        // Clear existing cart first
        setCheckArr([]);
        setCount(0);

        if (data.cart && data.cart.length > 0) {
          const backendCart = data.cart
            .map((item) => {
              const matchedProduct = [...Products, ...NewProducts].find(
                (p) => p.id.toString() === item.productId
              );

              if (matchedProduct) {
                return {
                  ...matchedProduct,
                  quantity: item.quantity,
                };
              }
              return null;
            })
            .filter(Boolean);

          // Update state and localStorage with server data
          setCheckArr(backendCart);
          setCount(backendCart.length);
          localStorage.setItem('cartItems', JSON.stringify(backendCart));
          localStorage.setItem('itemCount', JSON.stringify(backendCart.length));

          console.log('Updated cart with user data', backendCart);
        } else {
          // Clear localStorage if server cart is empty
          localStorage.removeItem('cartItems');
          localStorage.setItem('itemCount', '0');
        }
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
              loadUserCart={loadUserCart}
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
