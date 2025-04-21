import axios from "axios";

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/productos',
    };

    await axios
    .request(options)
    .then(function (response) {
    setProductos(response.data);
    })
    .catch(function (error) {
    console.error(error);
    });
    setEjecutarConsulta(false);
};

//Añadir demas funciones de axios

export const obtenerEmpleados = async (setEmpleados, setEjecutarConsulta) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/empleados/',
    };

    await axios
    .request(options)
    .then(function (response) {
    setEmpleados(response.data);
    })
    .catch(function (error) {
    console.error(error);
    });
    setEjecutarConsulta(false);
};