import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@mui/material';
import { obtenerProductos, crearProducto, editarProducto , eliminarProducto } from 'utils/api';
import ReactLoading from 'react-loading';
import PrivateComponent from 'components/PrivateComponent';

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
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      await obtenerProductos(
        (response)=>{
          setProductos(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error)=>{
          console.error('Error', error);
        }
      );
    };

    if(ejecutarConsulta){
      fetchProductos();
      //setEjecutarConsulta(false);
    }
  }, [ejecutarConsulta]);

  //eliminar es prueba
  useEffect(() => {
    setProductos(productosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if(mostrarTabla) {
      setTextoBoton("Crear Producto");
    } else {
      setTextoBoton("Mostrar Productos")
    }
  }, [mostrarTabla]);

  return (
    <div>
      <button className='btn-submit btn-create-new'
        onClick={() => {
          setMostrarTabla(!mostrarTabla)
          }}
      >
        {textoBoton}
      </button>
      {mostrarTabla ? (
        <TablaProductos 
          loading={loading}
          listaProductos={productos}
          setEjecutarConsulta={setEjecutarConsulta}/>
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

const TablaProductos = ({loading, listaProductos, setEjecutarConsulta}) => {

  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  useEffect(() => {
    
    //si es un valor falsy, salir del useEffect
    if(!listaProductos) return;
    
    //console.log('busqueda', busqueda);
    //console.log('lista original', listaProductos);
    
    setProductosFiltrados(
      listaProductos.filter((elemento) => {
        //console.log('elemento', elemento);
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  useEffect(() => {
    //console.log('este es el listado de productos en el componente de la tabla', listaProductos);
  }, [listaProductos]);

  return <div className='table-container'>
      <div className='filter-input'>
        <input placeholder='Buscar'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}/>
      </div>
      {loading ? (
        <ReactLoading type='cylon' color='#abc444' height={500} width={350} />
      ) : (
        <table className='table-generic'>
          <caption className='subtitulo neon-layout'>Administracion de Productos</caption>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>Proveedor</th>
                <PrivateComponent roleList={['admin']}>
                  <th>Acciones</th>
                </PrivateComponent>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => {
                return (
                  <FilaProducto producto={producto} key={nanoid()} setEjecutarConsulta={setEjecutarConsulta}/>
                )
              })

              }
            </tbody>
        </table>
      )}
  </div>
};

const FilaProducto = ({producto, setEjecutarConsulta}) => {

  const [edit,setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    producto: producto.producto,
    stock: producto.stock,
    precio: producto.precio,
    descripcion: producto.descripcion,
    estado: producto.estado,
    proveedor: producto.proveedor,
  });

  const actualizarProducto = async() => {
    
    await editarProducto(
      producto._id,
      //hacer delete id o
      // {producto: infoNuevoProducto.producto,
      //  stock: infoNuevoProducto.stock,}
      infoNuevoProducto,
      
      (response) => {
        console.log(response.data);
        toast.success("Producto modificado!");
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error en la modificacion!");
      } 
    );
  };

  const borrarProducto = async() => {

    await eliminarProducto(
      producto._id,
      (response) => {
        console.log(response.data);
        toast.success("Producto eliminado!");
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error en la eliminacion!");
      }    
    );
    setOpenDialog(false);
  }  

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input type='text' size={4}
              value={infoNuevoProducto.producto}
              onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, producto: e.target.value})}/>
          </td>
          <td>
            <input type='text'
              value={infoNuevoProducto.stock}
              onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, stock: e.target.value})}/>
            </td>
          <td>
            <input type='text' 
              value={infoNuevoProducto.precio}
              onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, precio: e.target.value})}/>
            </td>
          <td>
            <input type='text' 
              value={infoNuevoProducto.descripcion}
              onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, descripcion: e.target.value})}/>
            </td>
          <td>
            <input type='text' 
              value={infoNuevoProducto.estado}
              onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, estado: e.target.value})}/>
          </td>
          <td>
            <input type='text' 
              value={infoNuevoProducto.proveedor}
              onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, proveedor: e.target.value})}/>
          </td>
        </>
      ) : (
        <>
          <td>{producto.producto}</td>
          <td>{producto.stock}</td>
          <td>{producto.precio}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.estado}</td>
          <td>{producto.proveedor}</td>
        </>
      )}
      <PrivateComponent roleList={['admin']}>
        <td>
          <div className='acciones'>
            {edit ? (
              <>
                <Tooltip title='Guardar' arrow>
                  <i onClick={() => actualizarProducto()}
                    className='fa fa-check'/>
                </Tooltip>
                <Tooltip title='Cerrar' arrow>
                <i onClick={() => setEdit(!edit)}
                  className='fa fa-xmark'/>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title='Editar Producto' arrow>
                  <i onClick={() => setEdit(!edit)}
                    className='fa fa-pencil'/>
                </Tooltip>
                <Tooltip title='Eliminar Producto' arrow>
                  <i onClick={() => setOpenDialog(true)}
                    className='fa fa-trash'/>
                </Tooltip>
              </>
            )}
          </div>
          <Dialog open={openDialog}>
              <div className='dialog-delete'>
                <h2>¿Esta seguro de eliminar el registro?</h2>
                <button onClick={() => borrarProducto()} className='btn-confirm'>Si</button>
                <button onClick={() => setOpenDialog(false)} className='btn-deny'>No</button>
              </div>
          </Dialog>
        </td>
      </PrivateComponent>
    </tr>
  );
};

const FormularioCreacionProductos = ({
  setMostrarTabla,
  listaProductos,
  setProductos}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    //evita evento por defecto de redirigir al hacer submit
    e.preventDefault();
    const fd = new FormData(form.current);

    //Para cada variable del formulario
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    crearProducto(
      { producto: nuevoProducto.producto,
        stock: nuevoProducto.stock,
        precio: nuevoProducto.precio,
        descripcion: nuevoProducto.descripcion,
        estado: nuevoProducto.estado,
        proveedor: nuevoProducto.proveedor,
      },
      (response) => {
        console.log(response.data);
        toast.success("Producto creado con exito!");
      },
      (error) => {
        console.error('Error: ',error);
        toast.error("Error creando producto");
      }
    );

    /*
    const options = {
      method: 'POST',
      url: 'http://localhost:5000/productos/nuevo',
      headers: {'Content-Type': 'application/json'},
      data: { producto: nuevoProducto.producto,
              stock: nuevoProducto.stock,
              precio: nuevoProducto.precio,
              descripcion: nuevoProducto.descripcion,
              estado: nuevoProducto.estado,
              proveedor: nuevoProducto.proveedor,
            },
    };

    await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      toast.success("Producto creado con exito!");
    })
    .catch(function (error) {
      console.error(error);
      toast.error("Error creando producto");
    })
    */
    
    setMostrarTabla(true);
    setProductos([...listaProductos, nuevoProducto]);
  };

  return (
    <div>
      <h2 className='subtitulo neon-layout'>Crear Nuevo Producto</h2>
      <form ref={form} onSubmit={submitForm} className='form-create'>
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
          <select name='estado' required defaultValue=''>
            <option disabled value=''>Seleccione una opcion</option>
            <option>En stock</option>
            <option>Agotado</option>
            <option>Baja disponibilidad</option>
          </select>
        </label>
        <label htmlFor='proveedor'>
          Proveedor
          <input name='proveedor' type='text' required/>
        </label>
        <button className='btn-submit' type='submit'>Guardar Producto</button>
      </form>
    </div>
  )
};

export default Productos;