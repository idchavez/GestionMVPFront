import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login'>
      <h2>Iniciar sesion en tu cuenta</h2>
      <form>
        <div>
          <input type='email' placeholder='abcd@mail.com' required/>
          <input type='password' required/>
        </div>
        <div>
          <label htmlFor='recuerdame'>
            <input type='checkbox' name='recuerdame' />
            Recuerdame
            <Link to='/'>¿Olvidaste tu contraseña?</Link>
          </label>
        </div>
        <div>
          <Link to='/admin'>
          <button type='submit'>Iniciar sesion</button>
          </Link>
        </div>
        <div>
          ¿No tienes cuenta?
          <Link to='/registro'>
            Registrate
          </Link>
        </div>
        <div>
          -------------- O --------------
        </div>
        <div>
          <button>Acceder con Google</button>
        </div>
      </form>
    </div>
  )
};

export default Login;