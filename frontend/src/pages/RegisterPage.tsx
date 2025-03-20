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
    navigate('/SignInPage');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);

        toast.success('Registration successful!');

        setTimeout(() => {
          navigate('/signinpage');
        }, 2000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full border border-green-700">
        <div className="flex flex-col justify-center border border-gray-300 rounded-[0.5rem] m-auto align-middle px-5 py-8 ">
          <div className="flex flex-col text-center justify-center mb-6 align-middle">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1>Register</h1>
            <h3>Register to create an account</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <p>Name</p>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
              required
            />

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
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3"
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
              placeholder="Create a password"
              className="border border-gray-400 rounded w-full py-2 pl-3"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="border border-none bg-black text-white w-full py-2 rounded my-5 hover:bg-opacity-75"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
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
