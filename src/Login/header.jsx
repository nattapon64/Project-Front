import React from 'react'
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom'

const guestNav = [
]

const userNav = [
  { to: '/', text: 'Home' },
  { to: '/new', text: 'New Todo' },
]

export default function Header() {
  const { user, logout } = useAuth()
  const finalNav = user?.user_id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <form className='navbarr text-black bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
      <img className='photo' src="cat.jpg" alt="photo" />
      <div className='test font-semibold '>Codecamp Academy 01</div>

      <div className="">
        <div className="name">
          <a className="mr-5">Hello, {user?.user_id ? user.username : 'Guest'}</a>
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
  )
}
