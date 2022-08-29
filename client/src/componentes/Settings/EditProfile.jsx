import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";

import { Link } from "react-router-dom";
import CompleteProfile from "./AuxEditProfile/CompleteProfile";
import UpdateProfile from "./AuxEditProfile/UpdateProfile";
import { Box } from "@mui/material";

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
    <div>
      <h1>Modificar perfil</h1>
      {user?.email === null ? (
        <p>
          No tienes acceso a estos datos ya que ingresaste como un usuario
          anonimo. Ve a la seccion de registrar para poder utilizar estos
          servicios.
          <Link to="/register">Registrarse</Link>
        </p>
      ) : estado.length === 1 ? (
        <UpdateProfile />
      ) : (
        <Box>
          <CompleteProfile />
        </Box>
      )}
    </div>
  );
}
