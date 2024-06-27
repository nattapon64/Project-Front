import axios from 'axios';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';

export default function Body() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/user/login', input);
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('http://localhost:2000/user/me', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      setUser(userResponse.data);
    } catch (error) {
      console.log(error.message);
      toast.error('Invalid username or password', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <form className='flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat' style={{ backgroundImage: 'url("https://get.wallhere.com/photo/anime-school-Sun-1779177.jpg")' }} onSubmit={handleSubmit}>
      <ToastContainer />
      <div className='p-8 rounded-lg shadow-lg max-w-md w-full bg-white bg-opacity-80'>
        <div className='text-2xl font-bold text-center mb-4'>WELCOME</div>
        <div className='space-y-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-center pointer-events-none px-3 border border-r-0 rounded-l-md bg-yellow-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-gray-500">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
              </div>
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={handleChange}
                className="flex-1 block w-full rounded-none rounded-r-md p-2 border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-center pointer-events-none px-3 border border-r-0 rounded-l-md bg-yellow-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-gray-500">
                  <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                className="flex-1 block w-full rounded-none rounded-r-md p-2 border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className='text-center'>
            <button className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
