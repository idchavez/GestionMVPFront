import React, { useState } from 'react'
import Ruta from './Ruta';

const SidebarResponsive = ({className}) => {

  const [mostrarNavegacion, setMostrarNavegacion] = useState(false);

  return (
    <div className='side-responsive'
      onClick={() => {setMostrarNavegacion(!mostrarNavegacion);}}>
        <i className={`fa fa-${mostrarNavegacion ? 'times' : 'bars'}`}></i>
      {mostrarNavegacion && <ul>
        <Ruta icono='fa fa-circle-user' ruta='/admin/perfil' nombre='Perfil'/>
          <Ruta icono='fa fa-cubes' ruta='/admin/productos' nombre='Productos'/>
          <Ruta icono='fa fa-users' ruta='/admin/empleados' nombre='Empleados' />
          <Ruta icono='fa fa-list-check' ruta='/admin/actividades' nombre='Actividades'/>
        
        </ul>}
    </div>
  )
}

export default SidebarResponsive