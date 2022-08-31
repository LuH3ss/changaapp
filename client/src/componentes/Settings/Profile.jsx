import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserEmail } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "../css/profile.css";
//IMPORT DE MATERIAL UI
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { useAuth } from "../../context/authContext";
import { Avatar, Box } from "@mui/material";

export default function Profile() {
  const { user } = useAuth();
  const estado = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEmail(user?.email));
    setLoading(false);
  }, [dispatch, user?.email, setLoading]);

  // console.log(estado[0].services[0].category.name)
  if (loading) return <h1>Loading..</h1>;
  else if (user?.email && estado?.length) {
    return (
      <div>
        {user?.email === null ? (
          <p>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </p>
        ) : estado?.length === 1 ? (
          // <Card sx={{ maxWidth: 500 }}>
          //   <CardMedia component="img" height="200" image={estado[0].img} alt="Profile photo" />
          //   <CardContent>
          //     <Typography gutterBottom variant="h5" component="div">
          //       Nombre y apellido: {estado[0].firstName + ' ' + estado[0].lastName}
          //     </Typography>
          //     <Typography gutterBottom variant="h5" component="div">
          //       Especialidad: {estado[0].services[0]?.category.name ? estado[0].services[0]?.category.name : 'Sin especialidad'}
          //     </Typography>
          //     <Typography variant="body2" color="text.secondary">
          //       Description: {estado[0].services[0]?.description}
          //     </Typography>
          //   </CardContent>
          // </Card>
          <Box
            variant="section"
            className="profile-container"
            sx={{ padding: "10%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "300px",
                width: "300px",
              }}
            >
              <Box sx={{ display: "flex", gap: "98px", alignItems: "center" }}>
                <Avatar
                  sx={{ width: 90, height: 90 }}
                  alt="Profile photo"
                  src={estado[0].img}
                />
                <Typography variant="h5">Perfil</Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "baseline", gap: "20px" }}
                variant="div"
              >
                <Typography variant="h6">Nombre y Apellido</Typography>
                <Typography variant="h6">
                  {estado[0].firstName + " " + estado[0].lastName}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "baseline", gap: "80px" }}
                variant="div"
              >
                <Typography variant="h6">Descripción</Typography>
                <Typography variant="h6">
                  {estado[0].services[0]?.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          navigate("/settings/edit")
        )}
      </div>
    );
  }
}
