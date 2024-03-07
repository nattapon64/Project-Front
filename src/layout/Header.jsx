import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
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
    <div className="navbar bg-base-100">
      <div>
        <img className='photo' src="cat.jpg" alt="photo" />
        <div className='test'>Car High School</div>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Hello, {user?.user_id ? user.username : 'Guest'}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
  );
}
