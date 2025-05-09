import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'

const Admin = () => {

  const { user} = useAuth0();

  return (
    <div>
      {
        user ? (
          <>
            <img src={user.picture} className='img-perfil' alt='imagen perfil' />
            <span className='neon-layout logo-private'>Bienvenido {user.name}</span>
          </>
        ) : (
          <span>Usuario no encontrado</span>
        )
      }
      <div>
        Add Dashboard Power Bi
      </div>
    </div>
  )
};

export default Admin;