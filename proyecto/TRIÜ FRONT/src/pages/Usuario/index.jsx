import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function UsuarioLista() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 5;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/rol");
        setRoles(response.data || []);
      } catch (error) {
        console.error("Error al cargar roles:", error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const consultarUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/usuario", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setListaUsuarios(response.data || []);
      } catch (error) {
        console.error("Error al consultar los usuarios", error);
        setListaUsuarios([]);
      }
    };
    consultarUsuarios();
  }, [listaUsuarios]);

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:9001/api/usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setListaUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario?._id !== id)
      );
      alert("El usuario fue eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEdit(usuario);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setUsuarioEdit(null);
    setShowModal(false);
  };

  const guardarEdicion = async () => {
    if (
      !usuarioEdit.nombre ||
      !usuarioEdit.apellidos ||
      !usuarioEdit.correo ||
      !usuarioEdit.password ||
      !usuarioEdit.rol
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      console.log("Datos enviados:", usuarioEdit);
      // eslint-disable-next-line no-unused-vars
      const { _id, __v, ...payload } = usuarioEdit;
      payload.rol = usuarioEdit.rol?._id || usuarioEdit.rol;

      const response = await axios.put(
        `http://localhost:9001/api/usuario/${_id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setListaUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario._id === _id ? response.data : usuario
        )
      );

      alert("El usuario fue actualizado con éxito");
      cerrarModal();
    } catch (error) {
      console.error(
        "Error al actualizar el usuario:",
        error.response?.data || error.message
      );
      alert(
        "Ocurrió un error al actualizar el usuario. Revisa la consola para más detalles."
      );
    }
  };

  const agregarUsuario = async () => {
    if (
      !usuarioEdit.nombre ||
      !usuarioEdit.apellidos ||
      !usuarioEdit.correo ||
      !usuarioEdit.password ||
      !usuarioEdit.rol
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      // Asegúrate de que rol es un _id válido para el backend
      const payload = {
        ...usuarioEdit,
        rol: usuarioEdit.rol?._id || usuarioEdit.rol, // Si usuarioEdit.rol es un objeto, usa el _id
      };

      // Imprime los datos enviados para verificar
      console.log("Datos enviados al servidor:", payload);

      // Realiza la solicitud al backend
      const response = await axios.post(
        "http://localhost:9001/api/usuario",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Actualiza la lista de usuarios con el nuevo usuario creado
      setListaUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);
      alert("Usuario agregado con éxito");
      cerrarModal();
    } catch (error) {
      // Manejo detallado del error
      console.error(
        "Error al agregar el usuario:",
        error.response?.data || error.message
      );

      // Muestra un mensaje más específico en caso de error
      alert(
        error.response?.data?.message ||
          "Ocurrió un error al agregar el usuario. Revisa la consola para más detalles."
      );
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setUsuarioEdit({
      ...usuarioEdit,
      [name]: value,
    });
  };

  const totalPaginas = Math.ceil(listaUsuarios.length / usuariosPorPagina);
  const usuariosMostrados = listaUsuarios.slice(
    (paginaActual - 1) * usuariosPorPagina,
    paginaActual * usuariosPorPagina
  );

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  return (
    <div
    className="container-fluid vh-100"
      style={{
        minHeight: "100vh",
        width: "100vw", 
        padding: "0", 
        backgroundColor: "#343a40", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="row g-3 mb-4" style={{ margin: "0" }}>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Total de Usuarios</h5>
              <h2 className="text-primary">{listaUsuarios.length}</h2>
              <p>El número total de usuarios disponibles.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Roles Disponibles</h5>
              <h2 className="text-success">{roles.length}</h2>
              <p>Los roles disponibles para los usuarios.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="text-muted">Usuarios Activos</h5>
              <h2 className="text-warning">
                {
                  listaUsuarios.filter(
                    (usuario) => usuario?.estado === "Activo"
                  ).length
                }
              </h2>
              <p>Usuarios actualmente activos.</p>
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
              apellidos: "",
              correo: "",
              password: "",
              rol: null,
            })
          }
        >
          Agregar Usuario
        </button>
      </div>
      <div className="card shadow-lg flex-grow-1">
        <div
          className="card-header  text-white text-center"
          style={{ backgroundColor: "#000127" }}
        >
          <h3 className="mb-0">Lista de Usuarios</h3>
          <p>Vista detallada de todos los usuarios disponibles.</p>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosMostrados.map((usuario, index) => {
                  if (!usuario || !usuario.nombre) {
                    console.warn(
                      `Usuario en la posición ${index} no tiene nombre o está indefinido.`
                    );
                    return null; // No renderiza nada si el usuario no está bien definido.
                  }

                  // Depuración: Verificamos los datos del usuario y los roles
                  console.log(`Usuario:`, usuario);
                  console.log(`Roles disponibles:`, roles);

                  // Asegúrate de que usuario.rol sea un array y toma el primer elemento
                  const rolId = Array.isArray(usuario.rol)
                    ? usuario.rol[0]?._id
                    : usuario.rol;
                  console.log(
                    `ID de rol encontrado para el usuario ${usuario.nombre}:`,
                    rolId
                  );

                  // Buscar el rol correspondiente al ID del usuario
                  const rolEncontrado = roles.find((rol) => rol._id === rolId);

                  return (
                    <tr key={usuario._id}>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.apellidos}</td>
                      <td>{usuario.correo}</td>
                      <td>
                        {rolEncontrado ? rolEncontrado.nombre : "Sin rol"}
                      </td>
                      <td class="d-flex gap-3">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => abrirModalEditar(usuario)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarUsuario(usuario._id)}
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
                <h5 className="modal-title">Agregar o Editar Usuario</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={usuarioEdit?.nombre || ""}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    value={usuarioEdit?.apellidos || ""}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Correo</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={usuarioEdit?.correo || ""}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={usuarioEdit?.password || ""}
                    onChange={manejarCambio}
                  />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select
                    name="rol"
                    className="form-control"
                    value={usuarioEdit?.rol?._id || ""}
                    onChange={(e) =>
                      setUsuarioEdit({
                        ...usuarioEdit,
                        rol: roles.find((rol) => rol._id === e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar Rol</option>
                    {roles.map((rol) => (
                      <option key={rol._id} value={rol._id}>
                        {rol.nombre}
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
                  onClick={usuarioEdit?._id ? guardarEdicion : agregarUsuario}
                >
                  {usuarioEdit?._id ? "Guardar cambios" : "Agregar Usuario"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuarioLista;
