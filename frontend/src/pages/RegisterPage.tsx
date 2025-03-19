import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const notify = () => toast("You're account was created");

  const goToSignInPage = () => {
    navigate('/SignInPage');
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

          <form onSubmit={(e) => e.preventDefault()}>
            <p>Name</p>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3 px-36"
            />

            <p>Email</p>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border border-gray-400 rounded w-full mb-3 py-2 pl-3"
            />

            <p>Password</p>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="password"
              placeholder="Create a password"
              className="border border-gray-400 rounded w-full py-2 pl-3"
            />
          </form>
          <div>
            <button
              onClick={notify}
              className="border border-none bg-black text-white w-full py-2 rounded my-5 hover:bg-opacity-75"
            >
              Register
            </button>
            <ToastContainer />
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
