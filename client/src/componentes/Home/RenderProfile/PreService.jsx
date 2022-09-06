import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import Footer from "../../Footer";
import Navbar from "../../PrivateRoute/Navbar";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function PreService() {
  let userState = useSelector((state) => state.services);
  const param = useParams();
  userState = userState.filter((n) => n.name === param.id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleOnClic = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <Box style={{ marginTop: "90px" }}>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "5%",
          border: "solid grey 1px",
          borderRadius: "10px",
          padding: "5%",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box>
            <img
              src={userState[0]?.user.img}
              alt={userState[0]?.user.firstName}
              width="150px"
              height="150px"
            />
            <Typography>{userState[0]?.user.firstName}</Typography>
            <Typography>{userState[0]?.user.location}</Typography>
          </Box>
          <p>Descripcion general:</p>
          <p>{userState[0]?.description}</p>

          <p>Certificados </p>
          <p>Aca pondriamos los certificados solicitados</p>

          <h4>Contratar Servicio</h4>
          <span>
            Metodos de pago: <b>Credito / Debito</b>
          </span>
          <p>${userState[0]?.price}</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "40%",
          }}
        >
          <Link to={`/home/public/${userState[0]?.user.id}`}>
            <Button variant="contained">Ver perfil</Button>
          </Link>

          <Link to={`/home/services/${userState[0]?.id}`}>
            <Button variant="contained">Reserva tu turno</Button>
          </Link>

          <Button variant="contained" onClick={handleOnClic}>
            Volver atras
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
