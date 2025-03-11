import React from 'react'
import { Link } from 'react-router-dom';

const Registro = () => {
  return (
    <div className='login'>
      <h2>Crea tu cuenta</h2>
            <form>
              <div className='inputs-registro'>
                <label htmlFor=''>
                  Nombre
                  <input type='text' name=''/>
                </label>
                <label htmlFor=''>
                  Apellido
                  <input type='text' name=''/>
                </label>
                <label htmlFor='telefono'>
                  Telefono
                  <input type='text' name='telefono'/>
                </label>
                <label htmlFor='nacimiento'>
                  Fecha Nacimiento
                  <input type='date' name='nacimiento'/>
                </label>
                <label htmlFor='email'>
                  Correo
                  <input type='email' placeholder='abcd@mail.com' required/>
                </label>
                <label htmlFor='password'>
                  Contraseña
                  <input type='password' required/>
                </label>
              </div>
              <div className='login-access'>
                <br/>
                <Link to='/admin'>
                  <button className='btn-submit' type='submit'>Registrarse</button>
                </Link>
                <br/>
                ¿Ya tienes cuenta?
                <br/><br/>
                <Link to='/login' className='links'> Inicia Sesion</Link>
              </div>
            </form>
    </div>
  )
};

export default Registro;