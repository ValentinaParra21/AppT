// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRoles = JSON.parse(localStorage.getItem('roles'));

    if (token) {
      const isTokenValid = checkTokenValidity(token);

      if  (isTokenValid) {
        setIsAuthenticated(true);
        setRoles(storedRoles || []);
      } else{
        logout();
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if(token && !checkTokenValidity(token)){
        logout();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkTokenValidity = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const curretTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > curretTime;
    } catch (error) {
      console.error('Error al verificar la validez del token:', error);
      return false;
    }
  };
  
  const login = (token, roles) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    setIsAuthenticated(true);
    setRoles(roles);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
