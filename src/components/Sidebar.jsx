import React from 'react'
import { Link } from 'react-router-dom';
import TriggerDarkMode from './TriggerDarkMode';

const Sidebar = () => {

  return (
    <nav className='sidebar'>
        <Link className='neon-layout logo-private' to='/admin'>Gestion MVP</Link>
        <div className='rutas-admin'>
          <Ruta icono='fa fa-circle-user' ruta='/admin/perfil' nombre='Perfil'/>
          <Ruta icono='fa fa-cubes' ruta='/admin/productos' nombre='Productos'/>
          <Ruta icono='fa fa-users' ruta='/admin/empleados' nombre='Empleados' />
          <Ruta icono='fa fa-list-check' ruta='/admin/actividades' nombre='Actividades'/>
        </div>
        {/*<TriggerDarkMode/>*/}
        <button className='btn-submit'>Cerrar sesion</button>   
    </nav>
  )
};

const Ruta = ({icono, ruta, nombre }) => {
  return (
    <Link to={ruta}>
      <button>
        <i className={`${icono}`} />
        {nombre}
      </button>
    </Link>
  )
};

export default Sidebar;