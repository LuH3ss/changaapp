import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import {
  getAllServices,
  postNotification,
  updateRequest,
} from "../../../redux/actions";
import { Link } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { Button, Box, Typography } from "@mui/material";
import userImg from '../../../user.png'



export default function StateRequest() {
  const { user } = useAuth();
  const serviceState = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const filterEmail = serviceState.filter(
    (state) => state.user?.email === user?.email
  );
  const [btn, setBtn] = useState({
    state: "",
    id: "",
    email: "",
  });
  //ESTADO PARA LA NOTIFICACION AUTOMATICA
  const [noti, setNoti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });
  //PARA TRAER LOS SERVICIOS
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  //PARA CAMBIAR EL VALOR DEL ESTADO
  const handleOnClick = (e) => {
    if (btn.state === "") {
      setBtn({
        ...btn,
        state: e.target.name,
        id: e.target.value,
      });
      //ESTO ES PARA ENVIAR LA NOTIFICACION AUTOMATICA
      setNoti({
        message: `Tu pedido del trabajo ${filterEmail[0].name} fue aceptado.`,
        userNotification_id: filterEmail[0]?.user.id,
        userNotificated_id: e.target.className
      })

    } else if (btn.state !== e.target.name) {
      document.getElementById(btn.state).checked = false;
      setBtn({
        ...btn,
        state: e.target.name,
        id: e.target.value,
      });
      //ESTO ES PARA ENVIAR LA NOTIFICACION AUTOMATICA
      setNoti({
        message: `Tu pedido del trabajo ${filterEmail[0]?.name} fue rechazado.`,
        userNotification_id: filterEmail[0]?.user.id,
        userNotificated_id: e.target.className,
      });
    }
  };
  // PARA ENVIAR EL FORMULARIO AL BACK
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (btn.state !== "") {
      dispatch(postNotification(noti));
      dispatch(updateRequest({ ...btn, email: e.target.name }));
      toast('Solicitud Actualizada', {
        icon: '👏',
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  };
  console.log(filterEmail)
  return (
    <Box sx={{ width: "70%" }}>

      <h1>Estado del Servicio</h1>
      <Toaster position="top-center" reverseOrder={false} />

      {filterEmail.length === 0 ? (
        <p>
          Para ver los estados del servicio, primero debes publicar uno,
          dirigete a la seccion{" "}
          <Link to="/home/createService">publicar servicio</Link>
        </p>
      ) : (
        filterEmail?.map((p) => {
          return (
            p.request?.map((e) => {
              return e.state === "rechazado" || e.state === 'Pagado' ? (
                <p>
                  La orden #{e.id} del servicio {filterEmail[0].name} fue {e.state === 'Pagado' ? 'Pagada' : 'Rechazada'}
                </p>
              ) : (

                <Box sx={{display:'flex', border:'solid grey 1px', margin:'2%', padding:'2%', borderRadius:'10px'}}>
                  <Box sx={{width:'25%',display:'flex', flexDirection:'column',alignItems:'center'}}>
                  <Typography sx={{padding:'5%'}}>Reservado por: </Typography>
                  <img style={{width:'100px'}} src={e.userRequester?.img ? e.userRequester?.img : userImg} alt="asd" />
                  <Typography sx={{padding:'5%'}}>{e.userRequester?.firstName.concat(` ${e.userRequester.lastName}`)}</Typography>
                  {console.log(e.userRequester)}
                  </Box>
                  <Box sx={{width:'50%', display:'flex', flexDirection:'column', justifyContent:'space-around', padding:'0 2%'}}>
                  <Typography>Nombre del servicio: {filterEmail[0]?.name}</Typography>
                  <Typography>Estado: {e.state}</Typography>
                  <Typography>

                    Trabajo solicitado para el dia {e.day} a las {e.hours}hs
                  </Typography>
                  </Box>
                  <Box sx={{width:'25%'}}>
                  {e.state === "aceptado" ? (
                    <form
                      style={{height:'100%', display:'flex', flexDirection:'column',justifyContent:'space-around', padding:'0 2%'}}
                      name={e.userRequester.email}
                      onSubmit={(e) => handleOnSubmit(e)}
                    >
                      
                      <Button name="rechazado"
                      variant='contained'
                        value={e.id}
                        onClick={handleOnClick}
                        >Cancelar</Button>

                      <Button variant='contained' type="submit">Actualizar</Button>
                    </form>
                  ) : (
                    e.state === 'pendiente' ? 
                    <form
                    name={e.userRequester.email}
                    onSubmit={(e) => handleOnSubmit(e)}
                    style={{height:'100%', display:'flex', flexDirection:'column',justifyContent:'space-around', padding:'0 2%'}}
                    >

                      <Button
                        id="aceptado"
                        name="aceptado"
                        value={e.id}
                        onClick={handleOnClick}
                        variant='contained'
                      >
                        Aceptar
                      </Button>

                      <Button
                        id="rechazado"
                        name="rechazado"
                        email={e.userRequester.email}
                        value={e.id}
                        onClick={handleOnClick}
                        variant='contained'
                      >
                        Rechazar
                      </Button>
                    
                      <Button type='submit' variant='contained'>Confirmar</Button>
                    </form>
                  : console.log('asd')
                  )}
                  </Box>
                </Box>
              );
            })
          );
        })
      )}
    </Box>
  );
}
