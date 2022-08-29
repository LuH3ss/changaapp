import { Box, Button } from "@mui/material";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
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
        : <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', margin:'50px', gap:'20px'}} variant='section'>
            <Box sx={{display:'flex', flexDirection:'column', borderRight:'solid grey 1px', paddingRight:'5%'}}>
              <NavLink className='link' style={{textDecoration:'none', color: 'black', height:'40px', padding:'5% 4% 0 4%', width:'250px'}} to='/home'>Ir al inicio</NavLink>
              <NavLink className='link' style={{textDecoration:'none' , color: 'black', height:'40px', padding:'5% 4% 0 4%', width:'250px'}} to="profile">Perfil</NavLink>
              <NavLink className='link' style={{textDecoration:'none' , color: 'black', height:'40px', padding:'5% 4% 0 4%', width:'250px'}} to="edit">Editar Perfil</NavLink>
              <NavLink className='link' style={{textDecoration:'none' , color: 'black', height:'40px', padding:'5% 4% 0 4%', width:'250px'}} to='services'>Servicios publicados</NavLink>
              <NavLink className='link' style={{textDecoration:'none' , color: 'black', height:'40px', padding:'5% 4% 0 4%', width:'250px'}}to='request'>Estado de los servicios publicados</NavLink>
              <NavLink className='link' style={{textDecoration:'none' , color: 'black', height:'40px', padding:'5% 4% 0 4%', width:'250px'}} to='requester'>Estado de los servicios solicitados</NavLink>
              <NavLink className='link' style={{textDecoration:'none' , color: 'black', height:'40px', padding:'5% 4% 0 4%', width:'250px'}} to='/login' onClick={handleClick}>Cerrar Sesion</NavLink>
            </Box>
               <Outlet />
        </Box>
      }
    </div>
);
}
