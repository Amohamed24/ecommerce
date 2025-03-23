import { useState } from 'react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignInPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  loadUserCart: () => Promise<void>;
}
const SignInPage: React.FC<SignInPageProps> = ({ setIsLoggedIn, loading, loadUserCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const goToRegisterPage = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);

        if (data.name) {
          localStorage.setItem('name', data.name);
          console.log('Saved name to localStorage:', data.name);
        }

        // Check for saved cart items and restore them
        const savedCartItems = localStorage.getItem('savedCartItems');
        const savedCartCount = localStorage.getItem('savedCartCount');

        if (savedCartItems) {
          localStorage.setItem('cartItems', savedCartItems);
          localStorage.removeItem('savedCartItems');
        }

        if (savedCartCount) {
          localStorage.removeItem('savedCartCount');
          // Note: we can't update count here as we don't have access to setCount
        }

        await loadUserCart();

        setIsLoggedIn(true);

        toast.success('Login successful!');

        setTimeout(() => {
          navigate('/home');
        }, 1500);
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="flex h-screen w-full">
        <div className="flex flex-col justify-center border border-gray-300 rounded-[0.5rem] m-auto align-middle px-5 py-8 ">
          <div className="flex flex-col text-center justify-center mb-4">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1>Sign In</h1>
            <h3>Sign in to your account</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <p>Email</p>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
              required
            />

            <p>Password</p>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="border border-none bg-black text-white w-full py-2 rounded my-4 hover:bg-opacity-75"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <ToastContainer />

          <div>
            <h3>
              Don't have an account?{' '}
              <span
                onClick={goToRegisterPage}
                className="hover:underline cursor-pointer text-teal-400"
              >
                SignUp
              </span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
