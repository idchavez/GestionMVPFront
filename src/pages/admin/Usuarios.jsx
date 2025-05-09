import PrivateComponent from 'components/PrivateComponent';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
import { editarUsuario } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Usuarios = () => {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log('Usuarios: ', respuesta.data);
          setUsuarios(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsuarios();
  }, []);

  return (
    <div>
      Admin usuarios
      <PrivateComponent roleList={['admin']}>
          <button>btn privado</button>
      </PrivateComponent>
      <table className='table-generic'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
            return (
              <tr key={nanoid()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <RolesUsuario user={user}/>
                </td>
                <td>
                  <EstadoUsuario user={user}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

const RolesUsuario = ({user}) => {
  
  const [rol, setRol] = useState(user.rol);

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        {rol},
        (res)=>{
          console.log(res);
        },
        (err)=>{
          console.error(err);
        }
      );
    };
    if (user.rol !== rol) {
      editUsuario();
    }
  }, [rol, user]);

  return (
    <select value={rol} onChange={(e) => setRol(e.target.value)}>
      <option value="" disabled>Seleccione un rol</option>
      <option value="admin">Admin</option>
      <option value="vendedor">Vendedor</option>
      <option value="sin rol">Sin rol</option>
    </select>
  );
};

const EstadoUsuario = ({user}) => {
  const [estado, setEstado] = useState(user.estado);

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        {estado},
        (res)=>{
          console.log(res);
        },
        (err)=>{
          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);

  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)} defaultValue=''>
      <option value='' disabled >Seleccione un estado</option>
      <option value="autorizado">Autorizado</option>
      <option value="pendiente">Pendiente</option>
      <option value="rechazado">Rechazado</option>
    </select>
  )
};

export default Usuarios