/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetail,
  getUserEmail,
  postRequest,
} from "../../redux/actions/index.js";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Box, Typography, Button, TextField } from "@mui/material";
import userImg from "../../user.png";
import Navbar from "../PrivateRoute/Navbar";


export default function RequestService(props) {
  const { user } = useAuth();

  const [request, setRequest] = useState({
    day: "",
    hours: "",
    service_id: '',
    requester_id: ''
  });

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const service = useSelector((state) => state.serviceDetail);
  const userDb = useSelector(state => state.filter)

// console.log(service?.user.img)



  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getUserEmail(user?.email))
    setLoading(false)
  }, [dispatch, user?.email]);

  const weekDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];


  const handleOnChange = (e) => {
    e.preventDefault();
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const handleDay = (e) => {
    if(request.day !== ''){
      document.getElementById(request.day).style = 'color: #1F2937'
    }
    e.target.style.cssText = 'color: white; background-color: #1F2937';
    setRequest({
      ...request,
      day: e.target.value
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault()
    // console.log('dasdasdas')
    e.preventDefault();
    let requestService = {
      ...request,
      service_id: service.id,
      requester_id: userDb[0].id,
    };
    dispatch(postRequest(requestService));
    setRequest({
      day: "",
      hours: "",
    });
    navigate("/home");
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: 'center',
      height: "100vh",
      width: "100vw",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
    },
    containerRequest: {
      width: "60%",
      margin: "20px 10px 20px 20px"
    },
    containerUser: {
      margin: "20px 20px 20px 10px",
      flexDirection: 'column',
      width: "40%",
      display: "flex",
    },
    userDetail: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      width: '100%',
      border: "solid black 2px",
    },
    containerService: {
      display: "flex",
      flexDirection:'column',
      justifyContent: "center",
      alignItems: "center",
      border: "solid black 2px",
      padding: "20px",
    },
    containerRequestForm: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      border: "solid black 2px",
      marginTop: "20px",
      padding: "20px",
    },
    box: {
      display: "flex",
    },
    userPic: {
      width: "100px",
      height: '100px',
      borderRadius: "50%",
      padding: '20px'
    },
    userName: {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
      padding: '20px'
    },
    reviews: {
      width: "100%",
      border: "solid black 2px",
      marginTop: '20px'
    },
    selectedButton: {
      color: 'white',
      backgroundColor: 'black'
    }
  };

  console.log(request)

  if(loading) return <h1>loading</h1>
  else return (
    <div>
    <Navbar/>
      {
        user?.email === null ? <p>
        No tienes acceso a estos datos ya que ingresaste como un usuario
        anonimo. Ve a la seccion de registrar para poder utilizar estos
        servicios.
        <Link to="/register">Registrarse</Link>
      </p>
        : 
    <Box style={styles.container}>
      <Box sx={{display:'flex', width: '100%', margin: '20px'}}>
        <Box style={styles.containerRequest}>
          <Box style={styles.containerService}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Typography variant="h4">
                {service.name}
              </Typography>
              <Box style={styles.box}>
                <Typography variant="h4">Precio: </Typography>
                <Typography
                  sx={{color:'green', marginLeft:'10px'}} 
                  variant="h4">
                  {` $${service.price}`} 
                </Typography>
              </Box>
            </Box>
            <Box sx={{width:'100%', padding: '20px'}}>
              <Typography variant="h5">{`Descripción: ${service.description}`}</Typography>
            </Box>
          </Box>
          <Box style={styles.containerRequestForm}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Box sx={{display:'flex', justifyContent:'center'}}>
                {
                weekDays.map((el) => {
                  if(service.day?.split(',').includes(el)){
                    return <Button 
                      variant="outlined"
                      id={el} 
                      value={el} 
                      onClick={(e) => handleDay(e)}
                      sx={{color: "#1F2937", margin: '5px'}}
                    >
                      {el}
                    </Button>
                  }else return <Button 
                    disabled variant="outlined"
                    sx={{color: "#1F2937", margin: '5px'}}
                  >
                  {el}
                  </Button>
                })}
              </Box>
              <Box style={styles.box}>
                <TextField
                  id="outlined-basic"
                  label="horario"
                  variant="outlined"
                  style={styles.input}
                  type="text"
                  name="hours"
                  value={request.hours}
                  onChange={handleOnChange}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Link style={{ textDecoration: "none" }} to="/home">
                  <Button style={{ color: "#1F2937" }}>
                    Volver atras
                  </Button>
                </Link>
                <Button sx={{ color: "#1F2937" }} type="submit">
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
          <Box style={styles.reviews}>
              reviews
          </Box>

        </Box>
      </Box>
    </Box>
      }
  </div>
  );

}
