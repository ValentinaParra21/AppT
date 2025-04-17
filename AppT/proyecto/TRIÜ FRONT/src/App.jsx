// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';  
import Navbar from './componentes/navbar';
import NavbarRoutes from './componentes/NavbarRoutes';
function App() {
  return (
  <AuthProvider>
    <Router> 
        <NavbarRoutes />
    </Router>
  </AuthProvider>
  );
}

export default App;
