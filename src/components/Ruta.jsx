import useActiveRoute from 'hooks/useActiveRoute';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

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

export default Ruta