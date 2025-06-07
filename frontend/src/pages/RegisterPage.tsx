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
      console.error('Error registering user:', err);
      toast.error('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="m-auto max-w-md p-8 shadow-lg rounded-xl bg-white">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-semibold mt-4">Register</h1>
          <p className="text-gray-600">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label>
            <span className="block mb-1">Name</span>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </label>
          <label>
            <span className="block mb-1">Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </label>
          <label>
            <span className="block mb-1">Password</span>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-black text-white rounded hover:opacity-90"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <span
              onClick={goToSignInPage}
              className="text-teal-500 hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
};

export default RegisterPage;
