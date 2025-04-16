// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


function PedidoLista() {
  const [listaProductos, setListaProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [cat_producto, setCat_producto] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/cat_productos',
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
        setCat_producto(response.data.data || []);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/productos',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setListaProductos(response.data.data || []);
      } catch (error) {
        console.error('Error al consultar productos:', error);
        setListaProductos([]);
      }
    };
    fetchProductos();
  }, [listaProductos]);

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:9001/api/productos/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setListaProductos((prevProductos) =>
        prevProductos.filter((productos) => productos?._id !== id)
      );
      alert('El producto fue eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const abrirModalEditar = (productos) => {
    setProductoEdit(productos);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setProductoEdit(null);
    setShowModal(false);
  };

  const guardarEdicion = async () => {
    if (!productoEdit?.nombre || !productoEdit?.stock || !productoEdit?.cat_producto) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const { _id, __v, ...payload } = productoEdit;
      payload.cat_producto = productoEdit.cat_producto?._id || productoEdit.cat_producto;

      const response = await axios.put(
        `http://localhost:9001/api/productos/${_id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setListaProductos((prevProductos) =>
        prevProductos.map((productos) =>
          productos._id === _id ? response.data.data : productos
        )
      );

      alert('El producto fue actualizado con éxito');
      cerrarModal();
    } catch (error) {
      console.error(
        'Error al actualizar el producto:',
        error.response?.data?.message || error.message
      );
      alert('Ocurrió un error al actualizar el producto.');
    }
  };

  const agregarProducto = async () => {
    if (!productoEdit?.nombre || !productoEdit?.stock || !productoEdit?.cat_producto) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const payload = {
        ...productoEdit,
        cat_producto: productoEdit.cat_producto?._id || productoEdit.cat_producto,
      };

      const response = await axios.post(
        'http://localhost:9001/api/productos',
        payload,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }  
      );

      setListaProductos((prevProductos) => [
        ...prevProductos,
        response.data.data,
      ]);
      alert('Producto agregado con éxito');
      cerrarModal();
    } catch (error) {
      console.error(
        'Error al agregar el producto:',
        error.response?.data?.message || error.message
      );
      alert('Ocurrió un error al agregar el producto.');
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductoEdit({
      ...productoEdit,
      [name]: value,
    });
  };

  const totalPaginas = Math.ceil(listaProductos.length / productosPorPagina);
  const productosMostrados = listaProductos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };


  return (
    <div
      className="container-fluid py-5 d-flex flex-column justify-content-between"
      style={{
        minHeight: "100vh", width: "100vw", padding: "0",
        backgroundColor: "#343a40",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row g-3 mb-4" style={{ margin: "0" }}>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Total de Productos</h5>
              <h2 className="text-primary">{listaProductos.length}</h2>
              <p>El número total de productos disponibles.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Categorias Disponibles</h5>
              <h2 className="text-success">{cat_producto.length}</h2>
              <p>Las categorias disponibles para los productos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de agregar usuario */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm"
          style={{ marginRight: "8px", background: "#f5b400" }}
          onClick={() =>
            abrirModalEditar({
              nombre: "",
              stock: "",
              cat_producto: null,
            })
          }
        >
          Agregar Producto
        </button>
      </div>
      <div className="card shadow-lg flex-grow-1">
        <div
          className="card-header  text-white text-center"
          style={{ backgroundColor: "#000127" }}
        >
          <h3 className="mb-0">Lista de Productos</h3>
          <p>Vista detallada de todos los productos disponibles.</p>
        </div>

        <div className="card-body" style={{ width:"100%"}}>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Stock</th>
                  <th>Categoria</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosMostrados.map((productos, index) => {
                  if (!productos || !productos.nombre) {
                    console.warn(
                      `Usuario en la posición ${index} no tiene nombre o está indefinido.`
                    );
                    return null;
                  }
                  return (
                    <tr key={productos._id}>
                      <td>{productos.nombre}</td>
                      <td>{productos.stock}</td>
                      <td>
                        {productos.cat_producto?.nombre || "Sin categoria"}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => abrirModalEditar(productos)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarProducto(productos._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer">
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    i + 1 === paginaActual ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => cambiarPagina(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Productos</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={productoEdit?.nombre || ""}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="text"
                    name="stock"
                    className="form-control"
                    value={productoEdit?.stock || ""}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select
                    name="cat_producto"
                    className="form-control"
                    value={productoEdit?.cat_producto?._id || ""}
                    onChange={(e) => {
                      const categoriaSeleccionada = cat_producto.find(
                        (categoria) => categoria._id === e.target.value
                      );
                      setProductoEdit({
                        ...productoEdit,
                        cat_producto: categoriaSeleccionada || null,
                      });
                    }}
                  >
                    <option value="">Seleccionar categoria</option>
                    {cat_producto.map((categoria) => (
                      <option key={categoria._id} value={categoria._id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={productoEdit?._id ? guardarEdicion : agregarProducto}
                >
                  {productoEdit?._id ? "Guardar cambios" : "Agregar Producto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PedidoLista;