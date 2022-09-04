import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import {
  allRequest,
  deleteRequest,
  getUserEmail,
  postNotification,
} from "../../../redux/actions";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import styles from "./style.js";
import Dialog from "@mui/material/Dialog";
import Review from "../../Review";

export default function StateRequester() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  //PARA TRAER LOS REQUEST
  const requestState = useSelector((state) => state.allRequest);
  const filterById = requestState.filter(
    (e) => e.requester_id === userState[0]?.id
  );

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
    dispatch(allRequest());
  }, [dispatch, user?.email]);

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(deleteRequest(e.target.id));
    alert("Solicitud cancelada exitosamente");
    window.location.reload(true);
  };

  //PARA ENVIAR NOTIFIACION CON MENSAJE PERSONALIZADO
  const [noti, setNoti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });

  const [del, setDel] = useState({
    id: 0,
  });

  const [hide, setHide] = useState(true);

  const handleClic = (e) => {
    e.preventDefault(e);
    setNoti({
      ...noti,
      userNotificated_id: e.target.name,
    });
    setDel({
      id: e.target.id,
    });
    setHide(!hide);
  };

  const handleNotification = (e) => {
    e.preventDefault();
    setNoti({
      ...noti,
      message: e.target.value,
      userNotification_id: userState[0]?.id,
    });
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(postNotification(noti));
    dispatch(deleteRequest(del.id));
    window.location.reload(true);
  };

  const handleDele = (e) => {
    e.preventDefault();
    dispatch(deleteRequest(e.target.id));
    window.location.reload(true);
  }
  console.log(filterById)
  return (
    <Box sx={{ width: "70%" }} style={hide === false ? styles.con : styles.no}>
      <h1>Estado de los servicios solicitados</h1>
      {filterById.length === 0 ? (
        <p>Aun no has realizado ninguna solicitud</p>
      ) : (
        filterById.map((e) => {
          return (
            <div>
              <h3>{e.services?.name}</h3>
              <p>
                El servicio esta solicitado para el dia {e.day} a las {e.hours}
                hs
              </p>
              <p>Estado: {e.state}</p>
              {e.state === "rechazado" ? (
                <Button id={e.id} onClick={handleDele}>
                  Eliminar
                </Button>
              ) : (
                <div>
                  {e.state === "aceptado" ? (
                    <div>
                      <p>
                        Para pagar el servicio accede al siguiente{" "}
                        <Link to={`/home/services/payment/${e.services?.id}`}>
                          {" "}
                          link
                        </Link>
                      </p>
                      <p>
                        Si quieres cancelar la solicitud aprieta el siguiente
                        boton{" "}
                        <Button name={e.services?.user_id}
                        id={e.id}
                        onClick={handleClic}>
                          Cancelar
                        </Button>
                        <div>
                        <Dialog open={!hide}>
                        <div
                          style={hide === true ? styles.hide : styles.nohide}
                        >
                          <form onSubmit={(p) => handleClear(p)}>
                            <label>
                              Deja un mensaje explicando el motivo de
                              cancelacion
                            </label>
                            <br />
                            <input
                              type="text"
                              name="message"
                              value={noti.message}
                              onChange={handleNotification}
                            />
                            <br />
                            <button type="submit" id={e.id}>
                              Enviar
                            </button>
                          </form>
                          <button onClick={handleClic}>Cerrar</button>
                        </div>
                      </Dialog>
                        </div>
                      </p>
                    </div>
                  ) : (
                    <div>
                      {
                        e.state === 'Pagado' ? 
                        <Link to={`/services/review/${e.service_id}`}><button>Dejar review</button></Link>
                        
                        : <div>
                        <button
                          name={e.services?.user_id}
                          id={e.id}
                          onClick={handleClic}
                        >
                          Cancelar Servicio
                        </button>
                        <Dialog open={!hide}>
                          <div
                            style={hide === true ? styles.hide : styles.nohide}
                          >
                            <form onSubmit={(p) => handleClear(p)}>
                              <label>
                                Deja un mensaje explicando el motivo de
                                cancelacion
                              </label>
                              <br />
                              <input
                                type="text"
                                name="message"
                                value={noti.message}
                                onChange={handleNotification}
                              />
                              <br />
                              <button type="submit" id={e.id}>
                                Enviar
                              </button>
                            </form>
                            <button onClick={handleClic}>Cerrar</button>
                          </div>
                        </Dialog>
                      </div>
                      }
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </Box>
  );
}
