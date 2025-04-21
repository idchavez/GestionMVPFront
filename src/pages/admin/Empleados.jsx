import { Dialog, Tooltip } from '@mui/material';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { obtenerEmpleados } from 'utils/api';

const empleadosBackend = [
    {
      "nombres": "Juan Carlos",
      "apellidos": "Fernández López",
      "fechaIngreso": "2022-03-15",
      "cargo": "Analista de Datos",
      "correo": "juan.fernandez@email.com",
      "telefono": "3014567890",
      "estadoLaboral": "Activo"
    },
    {
      "nombres": "María Alejandra",
      "apellidos": "Gómez Ramírez",
      "fechaIngreso": "2021-07-10",
      "cargo": "Desarrolladora Backend",
      "correo": "maria.gomez@email.com",
      "telefono": "3127896541",
      "estadoLaboral": "Activo"
    },
    {
      "nombres": "Carlos Andrés",
      "apellidos": "Ríos Martínez",
      "fechaIngreso": "2020-11-25",
      "cargo": "Gerente de Proyectos",
      "correo": "carlos.rios@email.com",
      "telefono": "3206549873",
      "estadoLaboral": "Inactivo"
    },
    {
      "nombres": "Laura Beatriz",
      "apellidos": "Morales Pineda",
      "fechaIngreso": "2023-05-05",
      "cargo": "Especialista en Ciberseguridad",
      "correo": "laura.morales@email.com",
      "telefono": "3102345678",
      "estadoLaboral": "Activo"
    },
    {
      "nombres": "Santiago Esteban",
      "apellidos": "Pérez Castillo",
      "fechaIngreso": "2019-09-30",
      "cargo": "Administrador de Redes",
      "correo": "santiago.perez@email.com",
      "telefono": "3159873214",
      "estadoLaboral": "Inactivo"
    }  
];

const Empleados = () => {

const [empleados, setEmpleados] = useState([]);
const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
const [mostrarTabla, setMostrarTabla] = useState(true);
const [textoBoton, setTextoBoton] = useState("Crear Empleado");

useEffect(() => {
  if(ejecutarConsulta) {
    obtenerEmpleados(setEmpleados, setEjecutarConsulta);
    setEjecutarConsulta(false);
  }
}, [ejecutarConsulta]);

useEffect(() => {
  setEmpleados(empleadosBackend);
},[]);

useEffect(() => {
  if (mostrarTabla) {
    setEjecutarConsulta(true);
  }
}, [mostrarTabla]);

  useEffect(() => {
    if(mostrarTabla) {
      setTextoBoton("Crear Empleado");
    } else {
      setTextoBoton("Mostrar Empleados");
    }
  }, [mostrarTabla]);

  return (
    <div>
      <button className='btn-submit btn-create-new'
        onClick={() => {
          setMostrarTabla(!mostrarTabla);
        }}>
          {textoBoton}
      </button>

      <Tooltip title='Notificaciones' arrow>
              <i className='fa fa-bell'/>
            </Tooltip>

      {mostrarTabla ? (
        <TablaEmpleados listaEmpleados={empleados} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionEmpleados setMostrarTabla={setMostrarTabla} listaEmpleados={empleados} setEmpleados={setEmpleados}/>
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  )
};

const TablaEmpleados = ({listaEmpleados, setEjecutarConsulta}) => {

  const [busqueda,setBusqueda] = useState('');
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState(listaEmpleados); 

  useEffect(() => {
    setEmpleadosFiltrados(
      listaEmpleados.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    )
  }, [busqueda, listaEmpleados]);

  return (
    <div className='table-container'>
      <div className='filter-input'>
        <input placeholder='Buscar'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}/>
      </div>
      <table className='table-generic'>
      <caption className='subtitulo neon-layout'>Administracion de Empleados</caption>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha Ingreso</th>
            <th>Cargo</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Estado Laboral</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {empleadosFiltrados.map((empleado) => {
              return (
                <FilaEmpleado empleado={empleado} key={nanoid()} setEjecutarConsulta={setEjecutarConsulta}/>
              )
              })
            }
        </tbody>
      </table>
    </div>
  )
}

const FilaEmpleado = ({empleado, setEjecutarConsulta}) => {

  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoEmpleado, setInfoNuevoEmpleado] = useState({
    nombres: empleado.nombres,
    apellidos: empleado.apellidos,
    fechaIngreso: empleado.fechaIngreso,
    cargo: empleado.cargo,
    correo: empleado.correo,
    telefono: empleado.telefono,
    estadoLaboral: empleado.estadoLaboral,
  });

  const actualizarEmpleado = async() => {
      console.log(infoNuevoEmpleado);
  
        const options = {
          method: 'PATCH',
          url: 'http://localhost:8080/gestionmvp-app/empleados',
          headers: {'Content-Type':'application/json'},
          data: {...infoNuevoEmpleado, id: empleado.idempleado}
        };
    
        await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          toast.success("Empleado modificado!");
          setEdit(false);
          setEjecutarConsulta(true);
        })
        .catch(function (error) {
          console.error(error);
          toast.error("Error en la modificacion!")
        });
    };
  
    const eliminarEmpleado = async() => {
      const options = {
        method: 'DELETE',
        url: 'http://localhost:8080/gestionmvp-app/empleados',
        headers: {'Content-Type':'application/json'},
        data: {id: empleado.idempleado}
      };
  
      await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Empleado eliminado!");
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error en la eliminacion!")
      });    
      setOpenDialog(false);
    }
    
  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input type='text'
              value={infoNuevoEmpleado.nombres}
              onChange={(e) => setInfoNuevoEmpleado({...infoNuevoEmpleado, nombres: e.target.value})}/>
          </td>
          <td>
            <input type='text'
              value={infoNuevoEmpleado.apellidos}
              onChange={(e) => setInfoNuevoEmpleado({...infoNuevoEmpleado, apellidos: e.target.value})}/>
          </td>
          <td>
            <input type='text'
              value={infoNuevoEmpleado.fechaIngreso}
              onChange={(e) => setInfoNuevoEmpleado({...infoNuevoEmpleado, fechaIngreso: e.target.value})}/>
          </td>
          <td>
            <input type='text'
              value={infoNuevoEmpleado.cargo}
              onChange={(e) => setInfoNuevoEmpleado({...infoNuevoEmpleado, cargo: e.target.value})}/>
          </td>
          <td>
            <input type='text'
              value={infoNuevoEmpleado.correo}
              onChange={(e) => setInfoNuevoEmpleado({...infoNuevoEmpleado, correo: e.target.value})}/>
          </td>
          <td>
            <input type='text'
              value={infoNuevoEmpleado.telefono}
              onChange={(e) => setInfoNuevoEmpleado({...infoNuevoEmpleado, telefono: e.target.value})}/>
          </td>
          <td>
            <select required defaultValue={0}
              value={infoNuevoEmpleado.estadoLaboral}
              onChange={(e) => setInfoNuevoEmpleado({...infoNuevoEmpleado, estadoLaboral: e.target.value})}>
              <option disabled value={0}>Seleccione una opcion</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </td>
        </>
      ) : (
        <>
          <td>{empleado.nombres}</td>
          <td>{empleado.apellidos}</td>
          <td>{empleado.fechaIngreso}</td>
          <td>{empleado.cargo}</td>
          <td>{empleado.correo}</td>
          <td>{empleado.telefono}</td>
          <td>{empleado.estadoLaboral}</td>
        </>
      )}
      <td>
        <div className='acciones'>
          {edit ? (
            <>
              <Tooltip title='Guardar' arrow>
                <i onClick={() => actualizarEmpleado()}
                  className='fa fa-check'/>
              </Tooltip>
              <Tooltip title='Cerrar' arrow>
              <i onClick={() => setEdit(!edit)}
                className='fa fa-xmark'/>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar Empleado' arrow>
                <i onClick={() => setEdit(!edit)}
                  className='fa fa-pencil'/>
              </Tooltip>
              <Tooltip title='Eliminar Empleado' arrow>
                <i onClick={() => setOpenDialog(true)}
                  className='fa fa-trash'/>
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
            <div className='dialog-delete'>
              <h2>¿Esta seguro de eliminar el registro?</h2>
              <button onClick={() => eliminarEmpleado()} className='btn-confirm'>Si</button>
              <button onClick={() => setOpenDialog(false)} className='btn-deny'>No</button>
            </div>
        </Dialog>
      </td>
    </tr>
  )
};

const FormularioCreacionEmpleados = ({setMostrarTabla, listaEmpleados, setEmpleados}) => {
  
  const form = useRef(null);
  
  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoEmpleado = {};
    fd.forEach((value, key) => {
      nuevoEmpleado[key] = value;
    });

    const options = {
      method: 'POST',
      url: '',
      headers: {'Content Type': 'application/json'},
      data: {},
    };
    
    await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      toast.success("Empleado creado con exito!");
    })
    .catch(function (error) {
      console.error(error);
      toast.error("Error creando Empleado");
    });
      
    setMostrarTabla(true);
    setEmpleados([...listaEmpleados, nuevoEmpleado]);
  };
  
  return (
    <div>
      <h2 className='subtitulo neon-layout'>Crear Nuevo Empleado</h2>
      <form ref={form} onSubmit={submitForm} className='form-create'>
        <label htmlFor='nombres'>
          Nombres
          <input name='nombres' type='text' required/>
        </label>
        <label htmlFor='apellidos'>
          Apellidos
          <input name='apellidos' type='text' required/>
        </label>
        <label htmlFor='fechaIngreso'>
          Fecha Ingreso
          <input name='fechaIngreso' type='date' required/>
        </label>
        <label htmlFor='cargo'>
          Cargo
          <input name='cargo' type='text' required/>
        </label>
        <label htmlFor='correo'>
          Correo
          <input name='correo' type='email' required/>
        </label>
        <label htmlFor='telefono'>
          Telefono
          <input name='telefono' type='text' required/>
        </label>
        <label htmlFor='estadoLaboral'>
          Estado Laboral
          <select name='estadoLaboral' required defaultValue={0}>
            <option disabled value={0}>Seleccione una opcion</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </label>
        <button className='btn-submit-create btn-submit' type='submit'>Guardar Empleado</button>
      </form>
    </div>
  )
};

export default Empleados