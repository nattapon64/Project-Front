import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import Teacher from '../Teacher/teacher1';

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
    }
  };

  return (
    <form className='bode' onSubmit={handleSubmit}>
      <div className='login'>
        <div className='wel'>WELCOME</div>
        <div className='login1'>
          <div>Username</div>
          <label className="input input-bordered flex items-center gap-2 bg-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
            <input 
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange} />
          </label>
          <label>Password</label>
          <label className="input input-bordered flex items-center gap-2 bg-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input 
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange} />
          </label>
          <div className='but'>
            <button className="btn btn-primary animate-bounce">Login</button>
          </div>
        </div>
      </div>
    </form>
  );
}
