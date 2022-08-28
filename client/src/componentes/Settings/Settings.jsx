import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Navbar from "../PrivateRoute/Navbar";

export default function Settings() {
  const { user, logout } = useAuth();
  

  const handleClick = (e) => {
    logout();
    
  };

  return (
    <div>
      <Navbar />
      {
        user?.email === null || user?.undefined ? (
          <p>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </p>
        )
        : <div>
        <Link to='/home'>Ir al inicio</Link>
        <Link to="profile">Perfil</Link>
        <Link to="edit">Editar Perfil</Link>
        <Link to='services'>Servicios publicados</Link>
        <Link to='request'>Estado de los servicios publicados</Link>
        <Link to='requester'>Estado de los servicios solicitados</Link>
        <Link to='/login' onClick={handleClick}>Cerrar Sesion</Link>
        <Outlet />
        </div>
      }
    </div>
);
}
