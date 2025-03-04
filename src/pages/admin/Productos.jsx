import React, { useEffect, useState } from 'react'
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
          propMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          propAgregarProducto={setProductos}/>
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

const FormularioCreacionProductos = ({propMostrarTabla, listaProductos, propAgregarProducto}) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");

  const enviarABackend = () => {
    console.log('producto', nombreProducto, 'stock', stock);
    toast.success("Producto creado!");
    propMostrarTabla(true);
    propAgregarProducto([...listaProductos,
      {producto:nombreProducto,
        stock:stock,
        precio:precio,

      }
    ]);
  };

  

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form>
        <label htmlFor='nombreProducto'>
          Nombre del Producto
          <input name='nombreProducto' type='text' value={nombreProducto}
          onChange={(e) => {
            setNombreProducto(e.target.value);
          }} required/>
        </label>
        <label htmlFor='stock'>
          Stock
          <input name='stock' type='number' min={1} max={100} value={stock}
          onChange={(e) => {
            setStock(e.target.value);
          }} required/>
        </label>
        <label htmlFor='precio'>
          Precio
          <input name='precio' type='text' value={precio}
          onChange={(e) => {
            setPrecio(e.target.value);
          }} required/>
        </label>
        <label htmlFor='descripcion'>
          Descripcion
          <input name='descripcion' type='text' value={descripcion}
          onChange={(e) => {
            setDescripcion(e.target.value);
          }} required/>
        </label>
        <label htmlFor='estado'>
          Estado
          <select name='estado'
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
            }} required>
            <option disabled>Seleccione una opcion</option>
            <option>En stock</option>
            <option>Agotado</option>
            <option>Baja disponibilidad</option>
          </select>
        </label>
        <label htmlFor='proveedor'>
          Proveedor
          <input name='proveedor' type='text' value={proveedor}
          onChange={(e) => {
            setProveedor(e.target.value);
          }} required/>
        </label>
        <button type='submit' onClick={() => {
          enviarABackend();
        }}>Guardar Producto</button>
      </form>
    </div>
  )
};

export default Productos