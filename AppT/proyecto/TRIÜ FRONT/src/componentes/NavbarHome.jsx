import { Link } from 'react-router-dom';

function navbarhome() {
    return (
        <>
<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000127', width: '100%' }}>
  <div className="container-fluid">
    <a className="navbar-brand d-flex align-items-center" href="#">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5eZey95SOXB8Lv_jFMcSVObgv9ZpPaMqbA&s" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
      Triu Raclette
    </a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse d-flex justify-content-between w-100 text-center" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/HomePage" className="nav-link text-light">
                    TRIU 
                  </Link>
                </li>
        
                <li className="nav-item">
                  <Link to="/Sesion" className="nav-link text-light">
                    Inicio Sesión
                  </Link>
                </li>
      </ul>
    </div>
  </div>
</nav>


        </>
    );
}

export default navbarhome;