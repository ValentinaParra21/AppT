// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, roles, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/HomePage"); // Redirige a la página de inicio después de cerrar sesión
  };

  // Función para obtener las rutas según el estado de autenticación y los roles
  function obtenerRutasP(isAuthenticated, roles) {
    const rutasPublicas = [
      { path: "/HomePage", label: "Inicio" },
      { path: "/Sesion", label: "Iniciar Sesión" },
    ];

    const rutasPrivadas = [
      { path: "/Platillos", label: "Platillos", roles: ["Admin", "Mesero", "Root"] },
      { path: "/Pedidos", label: "Pedidos", roles: [ "Admin","Mesero" , "Root"] },
      { path: "/Usuario", label: "Usuarios", roles: ["Admin", "Root"] },
      { path: "/Productos", label: "Productos", roles: [ "Admin", "Root"] },
      { path: "/Facturas", label: "Facturas", roles: [ "Admin","Mesero", "Root"] },
    ];

    // Si el usuario está autenticado, solo mostrar las rutas privadas correspondientes
    if (isAuthenticated) {
      return rutasPrivadas.filter((ruta) =>
        ruta.roles.some((rol) => roles.includes(rol))
      );
    }

    // Si el usuario no está autenticado, mostrar solo las rutas públicas
    return rutasPublicas;
  }

  // Obtener las rutas permitidas según el estado de autenticación y roles
  const rutasPermitidas = obtenerRutasP(isAuthenticated, roles);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#000127", width: "100%" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5eZey95SOXB8Lv_jFMcSVObgv9ZpPaMqbA&s"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          Triü Raclette
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav mx-auto mb-2 mb-lg-0"
            style={{ textAlign: "center" }}
          >
            {/* Mapea las rutas permitidas y las muestra en el navbar */}
            {rutasPermitidas.map((ruta, index) => (
              <li className="nav-item" key={`${ruta.path}-${index}`}>
                <Link to={ruta.path} className="nav-link text-light">
                  {ruta.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mostrar el botón de "Cerrar sesión" si el usuario está autenticado */}
          {isAuthenticated && (
            <button
              className="btn btn-outline-warning"
              type="button"
              style={{ fontSize: "1rem" }}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
