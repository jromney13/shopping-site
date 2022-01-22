import styles from './Footer.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext'
import React from 'react';
import { useLogout } from '../Hooks/useLogout';


export default function Footer() {

  const { user } = useAuthContext()
  const { logout } = useLogout()
  const { navigate } = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <footer className='site-footer'>
        <div className='copyright'>~ 2021 JR Sites ~</div>
        {!user &&
          <Link to="/login">
              <div className='admin'>Admin Login</div>
          </Link>}
        {user && 
          <div className='admin' onClick={handleLogout}>Logout</div>
          }
    </footer>
  )
}




