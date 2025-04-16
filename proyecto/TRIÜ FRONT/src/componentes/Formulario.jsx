import React, { useState, useEffect } from "react";
import axios from "axios";

const PlatillosForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [platillo, setPlatillo] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    estado: "activo",
    categoria: "",
  });
  const [mensaje, setMensaje] = useState("");

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setPlatillo({ ...platillo, [e.target.name]: e.target.value });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9001/api/platillos",
        platillo
      );
      setMensaje(`Platillo "${response.data.nombre}" registrado con éxito.`);
      setPlatillo({
        nombre: "",
        precio: "",
        descripcion: "",
        estado: "activo",
        categoria: "",
      });
    } catch (error) {
      console.error("Error al registrar el platillo:", error);
      setMensaje("Error al registrar el platillo.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">Nuevo Pedido</h5>
              <button
                className="btn btn-warning btn-sm rounded-pill text-dark"
                onClick={() => setShowModal(true)}
              >
                Agregar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registrar Platillo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="nombre" className="form-label fw-bold">
                      Nombre del Platillo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control rounded-pill"
                      value={platillo.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="precio" className="form-label fw-bold">
                      Precio
                    </label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      className="form-control rounded-pill"
                      value={platillo.precio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                      Descripción
                    </label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      className="form-control rounded"
                      rows="3"
                      value={platillo.descripcion}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="categoria" className="form-label fw-bold">
                      Categoría
                    </label>
                    <select
                      id="categoria"
                      name="categoria"
                      className="form-select rounded-pill"
                      value={platillo.categoria}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                    {categorias.length === 0 && (
                      <p className="text-danger mt-2">
                        No hay categorías disponibles.
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-pill"
                  >
                    Registrar Platillo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje */}
      {mensaje && (
        <div className="alert alert-info mt-3 text-center rounded-pill">
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default PlatillosForm;