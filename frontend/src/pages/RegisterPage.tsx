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

  const goToSignInPage = () => {
    navigate('/signinpage');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ← relative path, Vite will proxy this to localhost:5000/api/user
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!');
        setTimeout(() => navigate('/signinpage'), 1500);
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
      <div className="flex h-screen w-full border border-green-700">
        <div className="flex flex-col justify-center border border-gray-200 shadow-sm max-w-md rounded-xl m-auto align-middle px-5 py-8">
          <div className="flex flex-col text-center justify-center mb-6 align-middle">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1>Register</h1>
            <h3>Register to create an account</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50 mb-3"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50 mb-3"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="border border-none bg-black text-white w-full py-3 rounded my-5 hover:bg-opacity-75"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            <ToastContainer />
          </form>
          <div>
            <h3>
              Already have an account?{' '}
              <span
                onClick={goToSignInPage}
                className="hover:underline cursor-pointer text-teal-400"
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
