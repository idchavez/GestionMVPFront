import React from 'react'
import { Link } from 'react-router-dom';

const index = () => {
  return (
      <div className='landing-button'>
      <button className='btn-login-landing'>
      <Link className='link-login neon-layout' to="/login">
        Login
      </Link>
      </button>
      </div>
  )
};

export default index;