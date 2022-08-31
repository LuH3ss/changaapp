import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";

import { useAuth } from "../../context/authContext";
import Navbar from "../PrivateRoute/Navbar";
import { Link, useNavigate } from "react-router-dom";
import FormService from "./AuxService/FormService";
import { Box } from "@mui/system";

export default function Servicios() {
  const { user } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  return (
    <Box>
      <Navbar />
      {user?.email === null ? (
        <p>
          No tienes acceso a estos datos ya que ingresaste como un usuario
          anonimo. Ve a la seccion de registrar para poder utilizar estos
          servicios.
          <Link to="/register">Registrarse</Link>
        </p>
      ) : (
        <FormService />
      )}
    </Box>
  );
}
