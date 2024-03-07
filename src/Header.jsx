import React from 'react'
import useAuth from './hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
];

const userNav = [

];


export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.user_id ? userNav : guestNav;
  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <div className="navbar-start">
          <div className="dropdown">
            <div>
              <img className='w-20 h-16' src={user.IMG} />
            </div>
          </div>
        </div>
        <div className="navbar-center text-black text-2xl font-semibold">
          <div className="">
            <div className=''>{user.role}</div>
          </div>
        </div>
        <div className="navbar-end mx-5 text-black">
          {user === ""
            ?
            <form className=''>
              <div className="">
                <div className="">
                  <a className="">Hello, {user?.user_id ? user.username : 'Guest'}</a>
                </div>
                <div className="">
                  <ul className="">
                    {finalNav.map(el => (
                      <li key={el.to} >
                        <Link to={el.to}>{el.text}</Link>
                      </li>
                    ))}
                    {user?.user_id && (
                      <li>
                        <Link to='#' onClick={hdlLogout}>Logout</Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </form>
            :
            <form className=''>
              <div className="flex gap-5">
                <div className="">
                  <ul className="">
                    {finalNav.map(el => (
                      <li key={el.to} >
                        <Link to={el.to}>{el.text}</Link>
                      </li>
                    ))}
                    {user?.user_id && (
                      <li>
                        <Link to='#' onClick={hdlLogout}>Logout</Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </form>}
        </div>
      </div>
    </div>
  )
}
