/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetail,
  getUserEmail,
  postNotification,
  postRequest,
} from "../../redux/actions/index.js";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Box, Typography, Button, TextField } from "@mui/material";
import userImg from "../../user.png";
import Navbar from "../PrivateRoute/Navbar";
import styles from "./style";
import Footer from '../Footer'

export default function RequestService(props) {
<<<<<<< HEAD
  const { user } = useAuth();
=======
  const { user } = useAuth(); // author

>>>>>>> origin/dev
  const [request, setRequest] = useState({
    day: "",
    hours: "",
    service_id: "",
    requester_id: "",
  });
<<<<<<< HEAD
=======

  // const [userEmail, setUserEmail] = useState(service.user.email)

>>>>>>> origin/dev
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const service = useSelector((state) => state.serviceDetail);
<<<<<<< HEAD
  const userDb = useSelector((state) => state.filter);

  // PARA MANDAR UNA NOTIFICACION
  
  const [noti] = useState({
    message: 'Recibiste una solicitud de servicio, dirigete a tu casilla para confirmar.',
    userNotification_id: userDb[0]?.id,
    userNotificated_id: service.user?.id
  })
  const [asd] = useState({
    message: `Servicio solicitado, dirigete a tu perfil para mas informacion.`,
    userNotification_id: userDb[0]?.id,
    userNotificated_id: userDb[0]?.id
  })
=======
  const userDb = useSelector((state) => state.filter); // duthor
console.log(service)
>>>>>>> origin/dev
  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getUserEmail(user?.email));
    setLoading(false);
  }, [dispatch, user?.email]);

  const weekDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handlePrev = (e) => {
    e.preventDefault()
    window.history.back()
  }

  const handleDay = (e) => {
    if (request.day !== "") {
      document.getElementById(request.day).style = "color: #1F2937";
    }
    e.target.style.cssText = "color: white; background-color: #1F2937";
    setRequest({
      ...request,
      day: e.target.value,
    });
  };

  const handleHour = (e) => {
    if (request.hours === "") {
      setRequest({
        ...request,
        hours: e.target.value,
      });
    } else if (request.hours !== e.target.value) {
      document.getElementById(request.hours).checked = false;
      setRequest({
        ...request,
        hours: e.target.value,
      });
    }
  };
  console.log(userDb)
  const handleSubmit = (e) => {
    e.preventDefault();
    if(userDb.length === 0) {
      alert('Para solicitar un servicio, primero debes completar los datos de tu perfil. Dirigete hacia tu perfil.')
    }
    if (userDb[0]?.id === service.user.id) {
      alert("No puedes hacer un pedido a un servicio que publicaste.");
    } else {
      let requestService = {
        ...request,
        service_id: service.id,
        requester_id: userDb[0].id,
      };
      dispatch(postNotification(asd))
      dispatch(postNotification(noti))
      dispatch(postRequest(requestService));
      setRequest({
        day: "",
        hours: "",
      });
      navigate("/home");
    }
  };

  if (loading) return <h1>loading</h1>;
  else
    return (
      <div>
        <Navbar />
        {user?.email === null ? (
          <p>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </p>
        ) : (
          <Box style={styles.container}>
            <Box sx={{ display: "flex", width: "100%", margin: "20px" }}>
              <Box style={styles.containerRequest}>
                <Box style={styles.containerService}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h4">{service.name}</Typography>
                    <Box style={styles.box}>
                      <Typography variant="h4">Precio: </Typography>
                      <Typography
                        sx={{ color: "green", marginLeft: "10px" }}
                        variant="h4"
                      >
                        {` $${service.price}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%", padding: "20px" }}>
                    <Typography variant="h5">{`Descripción: ${service.description}`}</Typography>
                  </Box>
                </Box>
                <Box style={styles.containerRequestForm}>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      {weekDays.map((el) => {
                        if (service.day?.split(",").includes(el)) {
                          return (
                            <Button
                              variant="outlined"
                              id={el}
                              value={el}
                              onClick={(e) => handleDay(e)}
                              sx={{ color: "#1F2937", margin: "5px" }}
                            >
                              {el}
                            </Button>
                          );
                        } else
                          return (
                            <Button
                              disabled
                              variant="outlined"
                              sx={{ color: "#1F2937", margin: "5px" }}
                            >
                              {el}
                            </Button>
                          );
                      })}
                    </Box>
                    <Box style={styles.containerHours}>
                      {service?.hours?.split(",").map((el) => {
                        return (
                          <Box style={styles.hours}>
                            <Typography>{el}</Typography>
                            <input
                              id={el}
                              onChange={(e) => handleHour(e)}
                              type="checkbox"
                              value={el}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        padding: "30px",
                      }}
                    >
                      
                        <Button  onClick={handlePrev} variant="outlined" style={{ color: "#1F2937" }}>
                          Volver atras
                        </Button>
                      
                      <Button
                        variant="outlined"
                        sx={{ color: "#1F2937" }}
                        type="submit"
                      >
                        Solicitar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
              <Box style={styles.containerUser}>
                <Box style={styles.userDetail}>
                  <Box style={styles.userName}>
                    <Typography variant="h4">
                      {service?.user?.firstName}
                    </Typography>
                    <Typography variant="h6">
                      {service?.user?.lastName}
                    </Typography>
                  </Box>
                  <img
                    style={styles.userPic}
                    src={service?.user?.img ? service?.user?.img : userImg}
                    alt="user-pic"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        <Footer/>
      </div>
    );
}
