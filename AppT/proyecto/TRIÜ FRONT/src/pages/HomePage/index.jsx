// eslint-disable-next-line no-unused-vars
import React from 'react';
// import { useRoutes, BrowserRouter as Router } from 'react-router-dom';

import Info from "../../componentes/info.jsx";
import Imagenes from "../../componentes/imagenes.jsx";
import Productos from "../../componentes/productos.jsx";
import Footerhome from "../../componentes/footerhome.jsx";

function HomePage() {
    return (
      <>
    
        <Info />
        <hr />
        <Imagenes />
        <hr />
        <Productos />
        <Footerhome /> 
      </>
    )
  }
  export default HomePage;