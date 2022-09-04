import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import {
  getAllServices,
  postNotification,
  updateRequest,
} from "../../../redux/actions";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import toast, {Toaster} from "react-hot-toast";

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
          return p.request.length === 0 ? (
            <p>No tienes estados pendientes del servicio {p.name}</p>
          ) : (
            p.request?.map((e) => {
              return e.state === "rechazado" || e.state === 'Pagado' ? (
                <p>
                  La orden #{e.id} del servicio {filterEmail[0].name} fue {e.state === 'Pagado' ? 'Pagada' : 'Rechazada'}
                </p>
              ) : (
                <div>
                  <p>Nombre del servicio: {p.name}</p>
                  <p>Reservado por: {e.userRequester?.firstName} </p>
                  <img src={e.userRequester?.img} alt="asd" width='150px'/>
                  <p>Estado: {e.state}</p>
                  <p>
                    Trabajo solicitado para el dia {e.day} a las {e.hours}hs
                  </p>
                  {e.state === "aceptado" ? (
                    <form
                      name={e.userRequester.email}
                      onSubmit={(e) => handleOnSubmit(e)}
                    >
                      <div>
                        <label>Cancelar</label>
                        <input
                          type="checkbox"
                          name="rechazado"
                          value={e.id}
                          onChange={handleOnClick}
                        />
                      </div>
                      <Button type="submit">Actualizar</Button>
                    </form>
                  ) : (
                    e.state === 'pendiente' ? <form
                    name={e.userRequester.email}
                    onSubmit={(e) => handleOnSubmit(e)}
                  >
                    <label>Aceptar</label>

                    <input
                      type="checkbox"
                      className={e.requester_id}
                      id="aceptado"
                      name="aceptado"
                      value={e.id}
                      onChange={handleOnClick}
                    />
                    <label>Rechazar</label>
                    <input
                      type="checkbox"
                      className={e.requester_id}
                      id="rechazado"
                      name="rechazado"
                      email={e.userRequester.email}
                      value={e.id}
                      onChange={handleOnClick}
                    />

                    <div>
                      <button>Confirmar</button>
                    </div>
                  </form>
                  : console.log('asd')
                  )}
                </div>
              );
            })
          );
        })
      )}
    </Box>
  );
}
