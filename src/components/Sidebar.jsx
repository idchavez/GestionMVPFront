import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul>
        <li>Gestion MVP</li>
        <li><Link to='/admin/productos'>Productos</Link></li>
        <li><Link to='/admin/empleados'>Empleados</Link></li>
        <li><Link to='/admin/actividades'>Actividades</Link></li>
        <li><Link to='/'>Cerrar sesion</Link></li>
      </ul>
    </nav>
  )
};

export default Sidebar;