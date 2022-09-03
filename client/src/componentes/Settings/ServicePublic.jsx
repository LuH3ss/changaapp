import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { deleteService, getUserEmail } from "../../redux/actions";
import { Link, NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export default function PublicServices() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log(userState);

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await toast.promise(dispatch(deleteService(e.target.id)), {
      loading: "Saving...",
      success: <b>Servicio borrado</b>,
      error: <b>No se pudo borrar el servicio</b>,
    });
    window.location.reload(true);
  };

  return (
    <Box sx={{ width: "70%" }}>
      {userState[0]?.services?.length === 0 ? (
        <div>
          <p>Este usuario no tiene ningun servicio registrado</p>
          <p>
            Si quieres publicar servicios, dirigete a la seccion{" "}
            <Link to="/home/createService">crear servicios</Link>{" "}
          </p>
        </div>
      ) : (
        userState[0]?.services.map((e) => {
          return (
            // <div>
            //   <Link to={`/settings/updateService/${e.id}`}><button>Modificar Servicio</button></Link>
            //   <button id={e.id} onClick={handleDelete} >Borrar Servicio</button>
            //   <h3>Categoria: {e.category.name}</h3>
            //   <h5>{e.name}</h5>
            //   <p>Dias disponibles: {e.day}</p>
            //   <p>Precio: ${e.price}</p>
            //   <p>
            //     Descripcion del servicio <br />
            //     {e.description}
            //   </p>
            // </div>

            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  border: "solid grey 1px",

                  borderRadius: "10px",
                  padding: "2%",
                  margin: "2%",
                }}
              >
                <Typography variant="h6">
                  Categoria: {e.category?.name}
                </Typography>

                <Typography variant="h6">{e.name}</Typography>
                <Typography variant="p">Dias disponibles: {e.day}</Typography>
                <Typography variant="p">Precio: ${e.price}</Typography>
                <Typography variant="p">
                  Descripcion del servicio <br />
                  {e.description}
                </Typography>

                <Button>
                  <NavLink
                    style={{ textDecoration: "none", color: "blue" }}
                    to={`${e.id}`}
                  >
                    Modificar Servicio
                  </NavLink>
                </Button>
                <Button id={e.id} onClick={handleDelete}>
                  Borrar Servicio
                </Button>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
}
