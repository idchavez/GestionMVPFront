import React from 'react'

const Actividades = () => {
  return (
    <div>
      <table>
      <caption>Administracion de Actividades</caption>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Creacion</th>
            <th>Vencimiento</th>
            <th>Asignacion</th>
            <th>Estado</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input/></td>
            <td><input/></td>
            <td><input/></td>
            <td><input/></td>
            <td><input/></td>
            <td><input/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Actividades