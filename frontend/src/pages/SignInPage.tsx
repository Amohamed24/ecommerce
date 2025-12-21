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
const SignInPage: React.FC<SignInPageProps> = ({
  setIsLoggedIn,
  loading,
  loadUserCart,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const goToRegisterPage = () => {
    navigate('/register');
  };

  // test credentials
  const useTestAccount = () => {
    setFormData({
      email: 'test@pulsepoint.com',
      password: 'testpass123',
    });
    setErrors({});
    toast.info('Test credentials filled in!', { autoClose: 2000 });
  };

  // Input validation
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);

        if (data.name) {
          localStorage.setItem('name', data.name);
        }

        if (data.email) {
          localStorage.setItem('email', data.email);
        }

        const savedCartItems = localStorage.getItem('savedCartItems');
        const savedCartCount = localStorage.getItem('savedCartCount');
        const savedQuantities = localStorage.getItem('savedQuantities');

        if (savedCartItems) {
          localStorage.setItem('cartItems', savedCartItems);
          localStorage.removeItem('savedCartItems');
        }

        if (savedCartCount) {
          localStorage.removeItem('savedCartCount');
        }

        if (savedQuantities) {
          localStorage.setItem('cartQuantities', savedQuantities);
          localStorage.removeItem('savedQuantities');
        }

        await loadUserCart();
        setIsLoggedIn(true);
        toast.success('Login successful!');

        setTimeout(() => {
          navigate('/landingPage');
        }, 1500);
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error instanceof Error) {
        if (
          error.message.includes('Failed to fetch') ||
          error.message.includes('NetworkError')
        ) {
          toast.error('Network error. Please check your internet connection.');
        } else {
          toast.error('Server error. Please try again later.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full bg-gray-50">
        <div className="flex flex-col justify-center border border-gray-200 shadow-sm max-w-md rounded-xl m-auto align-middle px-5 py-8 bg-white">
          <div className="flex flex-col text-center justify-center mb-4">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold mt-2">Sign In</h1>
            <h3 className="text-gray-600">Sign in to your account</h3>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-teal-800 font-medium mb-2">
              🧪 Demo Account Available
            </p>
            <p className="text-xs text-teal-700 mb-2">
              Try the app with our test account:
            </p>
            <div className="text-xs text-teal-600 bg-teal-100 rounded p-2 font-mono mb-2">
              <div>Email: test@pulsepoint.com</div>
              <div>Password: testpass123</div>
            </div>
            <button
              type="button"
              onClick={useTestAccount}
              className="text-xs bg-teal-400 text-white px-3 py-1 rounded hover:bg-teal-500 transition-colors"
            >
              Use Test Account
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50 mb-1 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mb-2">{errors.email}</p>
            )}

            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50 mb-1 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mb-2">{errors.password}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="border border-none bg-black text-white w-full py-2 rounded my-4 hover:bg-opacity-75 disabled:bg-gray-400"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <ToastContainer />

          <div className="text-center">
            <h3>
              Don't have an account?{' '}
              <span
                onClick={goToRegisterPage}
                className="hover:underline cursor-pointer text-teal-400 font-medium"
              >
                Sign Up
              </span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
