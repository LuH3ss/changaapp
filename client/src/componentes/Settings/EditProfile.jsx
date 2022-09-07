import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";
import { Link, NavLink } from "react-router-dom";
import CompleteProfile from "./AuxEditProfile/CompleteProfile";
import UpdateProfile from "./AuxEditProfile/UpdateProfile";
import { Box, Typography, Button } from "@mui/material";

export default function EditProfile() {
  const { user } = useAuth();
  //ESTADO PARA ACTUALIZAR
  const estado = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  //PARA TRAER LA DATA DESDE LA BASE DE DATOS

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  return (

    <Box sx={{width:'70%'}}>

      {user?.email === null ? (
         <Box sx={{textAlign: 'center', heigth: '100vh', padding: '21%'}}>

         <Typography>
           No tienes acceso a estos datos ya que ingresaste como un usuario
           anonimo. Ve a la seccion de registrar para poder utilizar estos
           servicios.
           <NavLink style={{fontWeight: '700'}} to="/register">Registrarse</NavLink>
         </Typography>
         </Box>
      ) : estado.length === 1 ? (
        <Box>
          <UpdateProfile />
        </Box>
      ) : (
        <Box>
          <CompleteProfile />
        </Box>
      )}
    </Box>
  );
}
