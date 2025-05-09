import React from 'react'
import { Link } from 'react-router-dom';
import Ruta from './Ruta';
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const {logout } = useAuth0();

  const cerrarSesion = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.setItem('token', null);
  };

  return (
    <nav className='sidebar'>

        <Link className='neon-layout logo-private' to='/admin/inicio'>Gestion MVP</Link>
        <div className='rutas-admin'>
          <Ruta icono='fa fa-house' ruta='/admin' nombre='Inicio'/>
          <Ruta icono='fa fa-circle-user' ruta='/admin/perfil' nombre='Perfil'/>
          <Ruta icono='fa fa-cubes' ruta='/admin/productos' nombre='Productos'/>
          <Ruta icono='fa fa-users' ruta='/admin/empleados' nombre='Empleados' />
          <Ruta icono='fa fa-list-check' ruta='/admin/actividades' nombre='Actividades'/>
        </div>
        {/*<TriggerDarkMode/>*/}
        <button className='btn-close-sesion'
          onClick={() => cerrarSesion()}>
          Cerrar sesion
        </button>   
    </nav>
  )
};

export default Sidebar;