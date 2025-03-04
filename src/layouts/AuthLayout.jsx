import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = ({children}) => {
  return (
    <div className='auth-layout'>
      <Link to='/'>
        <ion-icon name="home" size="large"></ion-icon>
      </Link>
      {children}
      <Outlet/>
    </div>
  )
};

export default AuthLayout;