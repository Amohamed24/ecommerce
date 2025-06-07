import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Products from './data/Products';
import Home from './pages/HomePage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import { ProductDetailsProps } from './types/types';
import { FaStar } from 'react-icons/fa';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import LandingPage from './pages/LandingPage';
import NewProducts from './data/NewProducts';
import { toast } from 'react-toastify';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

type SortOrder = 'none' | 'asc' | 'desc';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [orderProcessing, setOrderProcessing] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');


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

  const sortedProducts = useMemo(() => {
    if (sortOrder === 'none') {
      return filteredProducts;
    }

    return [...filteredProducts].sort((a, b) =>
      sortOrder === 'asc'
        ? a.price - b.price
        : b.price - a.price
    );
  }, [filteredProducts, sortOrder]);

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
            await fetch('https://ecommerce-z57e.vercel.app/api/user/add-to-cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                productId: listingData.id.toString(),
                name: listingData.title,
                price: listingData.price,
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

  const removeItem = async (productId: number | undefined) => {
    if (productId !== undefined) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch(
            `https://ecommerce-z57e.vercel.app/api/user/remove-from-cart/${productId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const updatedCart = checkArr.filter((item) => item.id !== productId);
          setCheckArr(updatedCart);

          const quantitiesStr = localStorage.getItem('cartQuantities');
          if (quantitiesStr) {
            const quantities = JSON.parse(quantitiesStr);
            delete quantities[productId];
            localStorage.setItem('cartQuantities', JSON.stringify(quantities));
          }

          const newCount = count - 1;
          setCount(newCount);

          localStorage.setItem('cartItems', JSON.stringify(updatedCart));
          localStorage.setItem('itemCount', JSON.stringify(newCount));

          toast.success('Item removed from cart');
        } catch (error) {
          console.error('Error removing item from backend cart:', error);
          toast.error('Error removing item. Please try again.');
        }
      } else {
        // Update local state as well
        const updatedCart = checkArr.filter((item) => item.id !== productId);
        setCheckArr(updatedCart);

        const quantitiesStr = localStorage.getItem('cartQuantities');
        if (quantitiesStr) {
          const quantities = JSON.parse(quantitiesStr);
          delete quantities[productId];
          localStorage.setItem('cartQuantities', JSON.stringify(quantities));
        }

        const newCount = count - 1;
        setCount(newCount);

        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        localStorage.setItem('itemCount', JSON.stringify(newCount));

        toast.success('Item removed from cart');
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
      // check if local cart needs to be updated to server
      const localCartItems = localStorage.getItem('cartItems');
      const localQuantities = localStorage.getItem('cartQuantities');

      let localCart = [];
      let updateToServer = false;

      if (localCartItems) {
        try {
          localCart = JSON.parse(localCartItems);
          updateToServer = localCart.length > 0;
        } catch (error) {
          console.error('Error parsing to local cart:', error);
        }
      }

      if (updateToServer) {
        await syncLocalCartToServer(
          localCart,
          JSON.parse(localQuantities || '{}')
        );
      }

      const response = await fetch('https://ecommerce-z57e.vercel.app/api/user/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Clear existing cart first
        setCheckArr([]);
        setCount(0);

        if (data.cart && data.cart.length > 0) {
          const backendCart = data.cart
            .map((item: { productId: string; quantity: any }) => {
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

          // Create and store quantities object from cart items
          const quantitiesObject: { [key: string]: number } = {}; 
          backendCart.forEach(
            (item: { id: string | number; quantity: number }) => {
              if (item.id) {
                quantitiesObject[item.id] = item.quantity || 1;
              }
            }
          );

          localStorage.setItem(
            'cartQuantities',
            JSON.stringify(quantitiesObject)
          );

        } else {
          // Clear localStorage if server cart is empty
          localStorage.removeItem('cartItems');
          localStorage.removeItem('cartQuantities');
          localStorage.setItem('itemCount', '0');
        }
      }
    } catch (error) {
      console.error('Error loading user cart:', error);
    }
  };

  const syncLocalCartToServer = async (
    localCart: any,
    quantities: { [x: string]: any }
  ) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // For each item in local cart, send it to the server
      for (const item of localCart) {
        // First, add the item to the cart if it's not already there
        await fetch('https://ecommerce-z57e.vercel.app/api/user/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.id.toString(),
            name: item.title,
            price: item.price,
            image: item.src,
            category: item.category,
            size: item.size,
          }),
        });

        // Then, update its quantity if needed
        if (item.id && quantities[item.id] && quantities[item.id] > 1) {
          await fetch('https://ecommerce-z57e.vercel.app/api/user/update-cart-quantity', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: item.id.toString(),
              quantity: quantities[item.id],
            }),
          });
        }
      }
    } catch (error) {
      console.error('Error syncing local cart to server:', error);
    }
  };

  const handlePlaceOrder = async () => {
    setOrderProcessing(true);

    try {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await fetch(
          'https://ecommerce-z57e.vercel.app/api/user/clear-cart',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setCheckArr([]);
          setCount(0);

          localStorage.setItem('cartItems', JSON.stringify([]));
          localStorage.setItem('cartQuantities', JSON.stringify({}));
          localStorage.setItem('itemCount', '0');

          toast.success('Order placed successfully!');
          setTimeout(() => {
            window.location.href = '/home';
          }, 1500);
        } else {
          toast.error(data.message || 'Failed to place order');
        }
      } else {
        setCheckArr([]);
        setCount(0);

        localStorage.setItem('cartItems', JSON.stringify([]));
        localStorage.setItem('cartQuantities', JSON.stringify({}));
        localStorage.setItem('itemCount', '0');

        toast.success('Order placed successfully!');
        setTimeout(() => {
          window.location.href = '/home';
        }, 1500);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('There was a problem placing your order');
    } finally {
      setOrderProcessing(false);
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
              products={sortedProducts}
              search={search}
              setSearch={setSearch}
              count={count}
              setCount={setCount}
              addToCart={addToCart}
              starRating={starRating}
              setFilteredByGender={setFilteredByGender}
              setSortOrder={setSortOrder}
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
          path="/cartPage/"
          element={
            <CartPage
              products={filteredProducts}
              search={search}
              setSearch={setSearch}
              checkArr={checkArr}
              setCheckArr={setCheckArr}
              count={count}
              setCount={setCount}
              removeItem={removeItem}
            />
          }
        ></Route>

        <Route
          path="/checkoutPage/"
          element={
            <CheckoutPage
              count={count}
              setCount={setCount}
              checkArr={checkArr}
              setCheckArr={setCheckArr}
              handlePlaceOrder={handlePlaceOrder}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
