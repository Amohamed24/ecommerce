import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {
  const navigate = useNavigate();

  const notify = () => toast('Sign in successful!');

  const goToRegisterPage = () => {
    navigate('/');
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

          <form onSubmit={(e) => e.preventDefault()}>
            <p>Email</p>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
            />

            <p>Password</p>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="password"
              placeholder="Enter your password"
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3"
            />
          </form>
          <div>
            <button
              onClick={notify}
              className="border border-none bg-black text-white w-full py-2 rounded my-4 hover:bg-opacity-75"
            >
              Sign In
            </button>
            <ToastContainer />
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
