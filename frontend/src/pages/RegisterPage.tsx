import { useState } from 'react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const goToSignInPage = () => {
    navigate('/');
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full bg-gray-50">
        <div className="flex flex-col justify-center border border-gray-200 shadow-sm max-w-md rounded-xl m-auto align-middle px-5 py-8 bg-white">
          <div className="flex flex-col text-center justify-center mb-6 align-middle">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold mt-2">Register</h1>
            <h3 className="text-gray-600">Create your account</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="Enter your name"
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50 mb-1 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mb-2">{errors.name}</p>
            )}

            <label htmlFor="email" className="text-sm font-medium">Email</label>
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

            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="Create a password (min 8 characters)"
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
              className="border border-none bg-black text-white w-full py-3 rounded my-5 hover:bg-opacity-75 disabled:bg-gray-400"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            <ToastContainer />
          </form>
          <div className="text-center">
            <h3>
              Already have an account?{' '}
              <span
                onClick={goToSignInPage}
                className="hover:underline cursor-pointer text-teal-400 font-medium"
              >
                Sign in
              </span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
