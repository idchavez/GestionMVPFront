import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login'>
      <h1>
        <Link to='/'>
        <i class="fa-solid fa-arrow-left"></i>
        </Link>Gestion MVP
      </h1>
      <h2>Iniciar sesion en tu cuenta</h2>
      <form>
        <div className='inputs-login'>
          <label htmlFor='usuario'> Usuario<br/>
            <input type='email' name="usuario" placeholder='abcd@mail.com' required/>
          </label>
          <label htmlFor='contraseña'>Contraseña<br/>
            <input type='password' name="contraseña" required/>
          </label>
        </div>
        <div className='login-access'>
          <label htmlFor='recuerdame'>
            <input type='checkbox' name='recuerdame' />
            Recuerdame
            <Link to='/' className='links'>  ¿Olvidaste tu contraseña?</Link>
          </label>
          <br/>
          <Link to='/admin'>
            <button className='btn-submit' type='submit'>Iniciar sesion</button>
          </Link>
          <br/>
          <Link to='/registro' className='links'>
          ¿No tienes cuenta?  Registrate
          </Link>
          <br/>
          <button className='btn-submit'>Acceder con Google</button>
        </div>
      </form>
    </div>
  )
};

export default Login;