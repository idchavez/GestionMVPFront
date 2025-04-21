import React from 'react'
import { Link } from 'react-router-dom';
import Ruta from './Ruta';

const Sidebar = () => {

  return (
    <nav className='sidebar'>

        <Link className='neon-layout logo-private' to='/admin/inicio'>Gestion MVP</Link>
        <div className='rutas-admin'>
          <Ruta icono='fa fa-house' ruta='/admin/inicio' nombre='Inicio'/>
          <Ruta icono='fa fa-circle-user' ruta='/admin/perfil' nombre='Perfil'/>
          <Ruta icono='fa fa-cubes' ruta='/admin/productos' nombre='Productos'/>
          <Ruta icono='fa fa-users' ruta='/admin/empleados' nombre='Empleados' />
          <Ruta icono='fa fa-list-check' ruta='/admin/actividades' nombre='Actividades'/>
        </div>
        {/*<TriggerDarkMode/>*/}
        <button className='btn-close-sesion'>Cerrar sesion</button>   
    </nav>
  )
};

export default Sidebar;