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

import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  if (loading)
    return (
      <Box sx={{ width: "70%" }}>
        <h1>Loading..</h1>
      </Box>
    );

    return (
      <Box sx={{ width: "70%" }}>
        {user?.email === null ? (
          <Box sx={{ display: "flex" }}>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </Box>
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
            sx={{ display:'flex', padding:'10%' }}
          >
              <Box sx={{width:'60%', display:'flex', flexDirection:'column'}}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  alt="Profile photo"
                  src={estado[0].img}
                />
                <Box sx={{display:'flex', justifyContent:'center', padding:'4%'}}>
                  <LocationOnIcon sx={{fontSize:'1.8rem'}}/>
                  <Typography variant="h6">
                    {estado[0].location}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{display:'flex', flexDirection:'column'}}>
              <Box
                sx={{ display: "flex", gap: "20px", padding:'5px 20px', borderBottom:'solid black 1px' }}
                variant="div"
              >
                <Typography variant="h4">
                  {
                  estado[0].firstName[0].toUpperCase().concat(estado[0].firstName.slice(1))
                  }
                </Typography>
                <Typography variant="h4">
                  {
                  estado[0].lastName[0].toUpperCase().concat(estado[0].lastName.slice(1))
                  }</Typography>
              </Box>
              <Typography sx={{padding:'4%'}} variant="h6">{estado[0].description}</Typography>
              </Box>
             
            </Box>
        ) : (
          navigate("/settings/edit")
        )}
      </Box>
    );
  
}
