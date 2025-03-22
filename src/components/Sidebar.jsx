import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useActiveRoute from 'hooks/useActiveRoute';

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
        <button className='btn-close-sesion'>Cerrar sesion</button>   
    </nav>
  )
};

const Ruta = ({icono, ruta, nombre }) => {

  const isActive = useActiveRoute(ruta);

  useEffect(() => {
    console.log(isActive, ruta);
  }, [isActive, ruta]);

  return (
    <Link to={ruta} className='ruta-link'>
      <button className={`${ isActive ? 'ruta-btn-active' : 'ruta-btn'}`}>
        <i className={`${icono}`} />
        {nombre}
      </button>
    </Link>
  )
};

export default Sidebar;