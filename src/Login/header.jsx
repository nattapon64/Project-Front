import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const guestNav = [];

const userNav = [
  { to: '/', text: 'Home' },
  { to: '/new', text: 'New Todo' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.user_id ? userNav : guestNav;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img className="w-10 h-10 rounded-full mr-2" src='https://static.vecteezy.com/system/resources/previews/004/641/880/original/illustration-of-high-school-building-school-building-free-vector.jpg' alt="Cat Photo" />
        <span className="font-semibold text-xl tracking-tight">Codecamp Academy 01</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white">
          {/* Hamburger icon */}
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <ul className="flex justify-center lg:justify-end">
            {finalNav.map(el => (
              <li key={el.to} className="mr-3">
                <Link to={el.to} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  {el.text}
                </Link>
              </li>
            ))}
            {user?.user_id && (
              <li>
                <Link to='#' onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          {user?.user_id && (
            <div className="text-white">{user.username}</div>
          )}
        </div>
      </div>
    </nav>
  );
}
