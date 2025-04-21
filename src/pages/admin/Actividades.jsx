import { Tooltip } from '@mui/material';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const actividadesBackend = [
  {
    "Nombre": "Revisión del informe mensual",
    "Descripcion": "Verificar informe financiero.",
    "Creacion": "2025-04-01",
    "Vencimiento": "2025-04-05",
    "Asignacion": "Laura Gómez",
    "Estado": "En progreso",
    "Prioridad": "Alta"
  },
  {
    "Nombre": "Actualizar inventario",
    "Descripcion": "Actualizar las existencias.",
    "Creacion": "2025-04-03",
    "Vencimiento": "2025-04-10",
    "Asignacion": "Carlos Ramírez",
    "Estado": "Pendiente",
    "Prioridad": "Media"
  },
  {
    "Nombre": "Capacitación en seguridad",
    "Descripcion": "Organizar capacitación.",
    "Creacion": "2025-04-02",
    "Vencimiento": "2025-04-12",
    "Asignacion": "María Torres",
    "Estado": "Pendiente",
    "Prioridad": "Alta"
  },
  {
    "Nombre": "Mantenimiento del sistema",
    "Descripcion": "Realizar mantenimiento preventivo.",
    "Creacion": "2025-04-04",
    "Vencimiento": "2025-04-08",
    "Asignacion": "José Martínez",
    "Estado": "En progreso",
    "Prioridad": "Alta"
  },
  {
    "Nombre": "Enviar cotizaciones",
    "Descripcion": "Cotizaciones a clientes potenciales.",
    "Creacion": "2025-04-01",
    "Vencimiento": "2025-04-06",
    "Asignacion": "Ana Delgado",
    "Estado": "Completado",
    "Prioridad": "Baja"
  }
];

const Actividades = () => {

  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  return (
    <div>
      <TablaActividades listaActividades={actividadesBackend} setEjecutarConsulta={setEjecutarConsulta}/>
    </div>
  )
}

const TablaActividades = ({listaActividades, setEjecutarConsulta}) => {

  const [busqueda, setBusqueda] = useState('');
  const [actividadesFiltradas, setActividadesFiltradas] = useState(listaActividades);


  useEffect(() => {
    setActividadesFiltradas(
      listaActividades.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    )
  }, [busqueda, listaActividades])

  return (
    <div className='table-container'>
      <div className='filter-input'>
        <input type='text' placeholder='Buscar'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} />
      </div>
      <table className='table-generic'>
        <caption className='subtitulo neon-layout'>Administracion de Actividades</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Creacion</th>
              <th>Vencimiento</th>
              <th>Asignacion</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividadesBackend.map((actividad) => {
              return (
                <FilaActividades actividad={actividad} key={nanoid()} setEjecutarConsulta={setEjecutarConsulta}/>
              )
              })
            }
          </tbody>
      </table>
    </div>
  )
};

const FilaActividades = ({actividad, setEjecutarConsulta}) => {
  
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevaActividad, setInfoNuevaActividad] = useState({
    nombre: actividad.Nombre,
    descripcion: actividad.Descripcion,
    creacion: actividad.Creacion,
    vencimiento: actividad.Vencimiento,
    asignacion: actividad.Asignacion,
    estado: actividad.Estado,
    prioridad: actividad.Prioridad,
  });
  
  const actualizarActividad = async() => {
    
    const options = {
      method: 'PATCH',
      url: 'http://localhost:8080/gestionmvp-app/actividades',
      headers: {'Content-Type':'application/json'},
      data: {...infoNuevaActividad, id: actividad.idactividad}
    };

    await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      toast.success("Actividad modificada!");
      setEdit(false);
      setEjecutarConsulta(true);
    })
    .catch(function (error) {
      console.error(error);
      toast.error("Error en la modificacion!")
    });
  };
    
  const eliminarActividad = async() => {
    const options = {
      method: 'DELETE',
      url: 'http://localhost:8080/gestionmvp-app/actividades',
      headers: {'Content-Type':'application/json'},
      data: {id: actividad.idactividad}
    };

    await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      toast.success("Actividad eliminada!");
      setEjecutarConsulta(true);
    })
    .catch(function (error) {
      console.error(error);
      toast.error("Error en la eliminacion!")
    });    
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input type='text'
              value={infoNuevaActividad.nombre}
              onChange={(e) => {setInfoNuevaActividad({...infoNuevaActividad, nombre: e.target.value})}}/>
          </td>
        </>
      ) : (
        <>
          <td>{actividad.Nombre}</td>
          <td>{actividad.Descripcion}</td>
          <td>{actividad.Creacion}</td>
          <td>{actividad.Vencimiento}</td>
          <td>{actividad.Asignacion}</td>
          <td>{actividad.Estado}</td>
          <td>{actividad.Prioridad}</td>
          <td>
            <Tooltip title='Editar' arrow>
              <i className='fa fa-pencil'/>
            </Tooltip>
            <Tooltip title='Borrar'>
              <i className='fa fa-trash'/>
            </Tooltip>
          </td>
        </>
      )}
    </tr>
  )
}

export default Actividades