import React, { useEffect, useState } from 'react';
import picprofile from 'media/yearmix.jpg'
import { Tooltip } from '@mui/material';

const Perfil = () => {

  const [cargarpic, setCargarPic] = useState(true);

  return (
    <div className='form-edit-profile'>
      {cargarpic ? (
          <img onClick={() => {
            setCargarPic(!cargarpic)}} 
            class="img-perfil" src={picprofile} alt="FotoPerfil" />
        ) : (
          <input className='img-perfil' type='file' accept='image/*'/>
        )
      }
      
      <h2 className='subtitulo'>Editar Perfil</h2>

      <div className='grid-name'>
        <label htmlFor=''>
          Nombre
          <input type='text' required/>
        </label>
        <label htmlFor=''>
          Apellido
          <input type='text' required/>
        </label>
      </div>
      <label htmlFor=''>
        Email
        <input type='email' required/>
      </label>
      <label htmlFor=''>
        Telefono
        <input type='text' required/>
      </label>
      <label htmlFor=''>
        Contraseña
        <input type='password' required/>
      </label>
      <div className='btn-edit-profile'>
        <button className='cerrar-submit' type='submit'>Cerrar</button>
        <button className='guardar-submit' type='submit'>Guardar</button>
      </div>
    </div>
  )
};

export default Perfil