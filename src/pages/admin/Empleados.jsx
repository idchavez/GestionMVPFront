import React from 'react'

const Empleados = () => {
  return (
    <div>
      <table>
      <caption>Administracion de Empleados</caption>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha Ingreso</th>
            <th>Cargo</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Estado Laboral</th>
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

export default Empleados