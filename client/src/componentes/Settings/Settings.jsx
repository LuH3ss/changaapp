import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Navbar from "../PrivateRoute/Navbar";

export default function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <Link to="profile">Perfil</Link>
      <Link to="edit">Editar Perfil</Link>
      <button onClick={handleClick}>Cerrar Sesion</button>
      <Outlet />
    </div>
);
}
