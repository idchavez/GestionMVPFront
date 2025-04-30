import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'

const Index = () => {

  const { loginWithRedirect } = useAuth0();

  return (
      <div className='landing-button'>
      <button className='btn-login-landing link-login neon-layout'
        onClick={() => loginWithRedirect()}>
      Login
      {/*<Link className='link-login neon-layout' to="/login">
        Login
      </Link> */}
      </button>
      </div>
  )
};

export default Index;