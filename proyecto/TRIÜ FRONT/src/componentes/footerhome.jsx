import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
  <div className="container">
    <div className="row">
      
      <div className="col-md-4">
        <h5>Triu Raclette Cheese</h5>
        <p>Disfruta de nuestros quesos artesanales premium, hechos con ingredientes frescos y naturales. La tradición suiza de la Raclette ahora más cerca de ti.</p>
      </div>


      <div className="col-md-4">
        <h5>Enlaces rápidos</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white">Nosotros</a></li>
          <li><a href="#" className="text-white">Sedes</a></li>
          <li><a href="#" className="text-white">Productos</a></li>
          <li><a href="#" className="text-white">Contacto</a></li>
        </ul>
      </div>

   
      <div className="col-md-4">
        <h5>Contacto</h5>
        <p><i className="fas fa-map-marker-alt"></i> Cra. 6 #58-38, Chapinero, Bogotá, Cundinamarca</p>
        <p><i className="fas fa-phone-alt"></i> Teléfono:  322 2346473</p>
        <p><i className="fas fa-envelope"></i> Correo Electronico: info@triuraclette.com</p>
      </div>
    </div>
    <hr className="my-4" />
    <div className="text-center">
      <p>&copy; 2024 Triu Raclette Cheese. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
