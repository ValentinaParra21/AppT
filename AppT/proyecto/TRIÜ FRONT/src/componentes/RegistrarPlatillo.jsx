import React, { useState, useEffect } from "react";
import axios from "axios";

const PlatillosForm = () => {
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
        setMensaje("Error al cargar categorías.");
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
      const response = await axios.post("http://localhost:9001/api/platillos", platillo);
      setMensaje(`Platillo ${response.data.nombre} registrado con éxito.`);
      setPlatillo({
        nombre: "",
        precio: 0,
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
      <h1 className="text-center mb-4">Registrar Platillo</h1>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="nombre">Nombre del Platillo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            placeholder="Ej: Tacos al Pastor"
            value={platillo.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            className="form-control"
            placeholder="Ej: 100"
            value={platillo.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            placeholder="Ej: Deliciosos tacos de cerdo al pastor"
            rows="3"
            value={platillo.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            className="form-select"
            value={platillo.estado}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            className="form-select"
            value={platillo.categoria}
            onChange={handleChange}
            required
            disabled={categorias.length === 0}
          >
            <option value="">Seleccionar categoría</option>
            {categorias.length > 0 ? (
              categorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.nombre}
                </option>
              ))
            ) : (
              <option>Cargando categorías...</option>
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrar Platillo
        </button>
      </form>
    </div>
  );
};

export default PlatillosForm;