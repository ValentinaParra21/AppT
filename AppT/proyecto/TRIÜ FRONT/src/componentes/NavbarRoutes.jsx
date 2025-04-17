// NavbarRoutes.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from '../componentes/ProtectedRoute.jsx';
import HomePage from '../pages/HomePage';
import Platillos from '../pages/Platillos';
import Pedidos from '../pages/Pedidos';
import Usuario from '../pages/Usuario';
import Navbar from '../componentes/navbar';
import Productos from '../pages/Productos';
import Sesion from '../componentes/iniciosesion';
import Facturas from "../pages/Factura";

const NavbarRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
             
                <Route path="/HomePage" element={<HomePage />} />
                {/* Aquí envuelves los componentes con ProtectedRoute */}
                <Route path="/Platillos" element={<ProtectedRoute allowedRoles={['Admin','Mesero', 'Root']}><Platillos /></ProtectedRoute>} />
                <Route path="/Pedidos" element={<ProtectedRoute allowedRoles={['Mesero','Admin', 'Root']}><Pedidos /></ProtectedRoute>} />
                <Route path="/Usuario" element={<ProtectedRoute allowedRoles={['Admin', 'Root']}><Usuario /></ProtectedRoute>} />
                <Route path="/Productos" element={<ProtectedRoute allowedRoles={['Admin', 'Root']}><Productos /></ProtectedRoute>} />
                <Route path="/Facturas" element={<ProtectedRoute allowedRoles={['Admin', 'Root']}><Facturas /></ProtectedRoute>} />
                <Route path="/Sesion" element={<Sesion />} />
            </Routes>
        </div>
    );
};

export default NavbarRoutes;
