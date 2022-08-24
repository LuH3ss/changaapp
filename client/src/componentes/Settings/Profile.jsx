import React, {useEffect} from "react";
import { useSelector  } from "react-redux";
import { Link } from "react-router-dom";
import { getUserEmail } from "../../redux/actions";
import { useDispatch } from "react-redux";
//IMPORT DE MATERIAL UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Navbar from "../PrivateRoute/Navbar";
import { useAuth } from "../../context/authContext";
const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOMkAMbpBh8B0S8l5dvwrIhlsLqOh-rmOBw&usqp=CAU'

export default function Profile() {
  const {user} = useAuth()
  const estado = useSelector((state) => state.filter);
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
        /* SECCION PREGUNTAS FRECUENTES */
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
          {/* <CardActions>
            <Button size="small" variant="outlined">
              <Link style={{ textDecoration: "none" }} to="">
                Contact
              </Link>
            </Button>
            <Button size="small" variant="outlined">
              <Link style={{ textDecoration: "none" }} to="">
                Update service
              </Link>
            </Button>
            <Button size="small" variant="outlined">
              <Link style={{ textDecoration: "none" }} to="/settings/edit">
                Edit Profile
              </Link>
            </Button>
            <Button size="small" variant="outlined">
              <Link style={{ textDecoration: "none" }} to="/home">
                Volver atras
              </Link>
            </Button>
          </CardActions> */}
        </Card>
      }
      
    </div>
  );
}