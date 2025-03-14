import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const productosBackend = [
  {
    producto: "Pc Asus",
    stock: "5",
    precio: "2300000",
    descripcion: "core i5, ram 8gb",
    estado: "enstock",
    proveedor: "Asus"
  },
  {
    producto: "Pc Lenovo",
    stock: "10",
    precio: "2800000",
    descripcion: "core i7, ram 8g",
    estado: "agotado",
    proveedor: "Lenovo"
  },
];

const Productos = () => {

  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Crear Producto");

  useEffect(() => {
    setProductos(productosBackend);
  }, []);

  useEffect(() => {
    if(mostrarTabla) {
      setTextoBoton("Crear Producto");
    } else {
      setTextoBoton("Mostrar Productos")
    }
  }, [mostrarTabla]);

  return (
    <div>
      <button 
        onClick={() => {
          setMostrarTabla(!mostrarTabla)
          }}
      >
        {textoBoton}
      </button>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos}/>
      ) : (
        <FormularioCreacionProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setProductos={setProductos}/>
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  )
};

const TablaProductos = ({listaProductos}) => {
  
  useEffect(() => {
    console.log('este es el listado de productos en el componente de la tabla', listaProductos);
  }, [listaProductos]);
  
  return <div>
    <table>
      <caption>Administracion de Productos</caption>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto) => {
            return (
              <tr>
                <td>{producto.producto}</td>
                <td>{producto.stock}</td>
                <td>{producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.estado}</td>
                <td>{producto.proveedor}</td>
              </tr>
            )
          })

          }
        </tbody>
      </table>
  </div>;
};

const FormularioCreacionProductos = ({
  setMostrarTabla,
  listaProductos,
  setProductos}) => {
  const form = useRef(null);

  const submitForm = (e) => {
    //evita evento por defecto de redirigir al hacer submit
    e.preventDefault();
    const fd = new FormData(form.current);

    //Para cada variable del formulario
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });
    
    setMostrarTabla(true);
    toast.success("Producto creado con exito!");
    setProductos([...listaProductos, nuevoProducto]);
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form ref={form} onSubmit={submitForm}>
        <label htmlFor='producto'>
          Nombre del Producto
          <input name='producto' type='text' required/>
        </label>
        <label htmlFor='stock'>
          Stock
          <input name='stock' type='number'
          min={1} max={100} required/>
        </label>
        <label htmlFor='precio'>
          Precio
          <input name='precio' type='text' required/>
        </label>
        <label htmlFor='descripcion'>
          Descripcion
          <input name='descripcion' type='text' required/>
        </label>
        <label htmlFor='estado'>
          Estado
          <select name='estado' required defaultValue={0}>
            <option disabled value={0}>Seleccione una opcion</option>
            <option>En stock</option>
            <option>Agotado</option>
            <option>Baja disponibilidad</option>
          </select>
        </label>
        <label htmlFor='proveedor'>
          Proveedor
          <input name='proveedor' type='text' required/>
        </label>
        <button type='submit'>Guardar Producto</button>
      </form>
    </div>
  )
};

export default Productos