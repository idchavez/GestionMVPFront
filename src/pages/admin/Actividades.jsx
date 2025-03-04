import React from 'react'

const Actividades = () => {
  return (
    <div>
      <table>
        <thead>
          <caption>Administracion de Actividades</caption>
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