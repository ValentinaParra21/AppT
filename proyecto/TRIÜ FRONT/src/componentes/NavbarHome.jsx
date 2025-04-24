import React from 'react';
import { Link } from 'react-router-dom';

function NavbarHome() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000127' }}>
      <div className="container-fluid">
        {/* Logo a la izquierda */}
        <Link className="navbar-brand d-flex align-items-center" to="/HomePage">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5eZey95SOXB8Lv_jFMcSVObgv9ZpPaMqbA&s"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          Triü Raclette
        </Link>

        {/* Toggler para móvil */}
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

        {/* Aquí centramos los links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item px-3">
              <Link to="/HomePage" className="nav-link text-light">
                Inicio
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/Sesion" className="nav-link text-light">
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarHome;
