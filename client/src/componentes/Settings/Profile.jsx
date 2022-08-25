import React, {useEffect} from "react";
import { useSelector  } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserEmail } from "../../redux/actions";
import { useDispatch } from "react-redux";
//IMPORT DE MATERIAL UI
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { useAuth } from "../../context/authContext";



export default function Profile() {
  const {user} = useAuth()
  const estado = useSelector((state) => state.filter);
  const navigate = useNavigate()
  console.log(estado)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);
  return (
    <div>
      
      {
        user?.email === null ? (
          <p>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </p>
        )
        :  
          (
            estado.length === 1 
            ? /* SECCION PREGUNTAS FRECUENTES */
            /* SECCION RESEÑAS Y RAITING */
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia component="img" height="200" image={estado[0].img} alt="Profile photo" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nombre y apellido: {estado[0].firstName + ' ' + estado[0].lastName} 
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Especialidad: Electricista
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: 
                </Typography>
              </CardContent>
              
            </Card>
            : navigate('/settings/edit')
          )
      }
      
    </div>
  );
}