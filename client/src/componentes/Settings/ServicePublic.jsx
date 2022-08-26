import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { getUserEmail } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function PublicServices() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log(userState);

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  return (
    <div>
      <h1>Servicios publicados</h1>
      {userState[0]?.services?.length === 0 ? (
        <p>Este usuario no tiene ningun servicio registrado</p>
      ) : (
        userState[0]?.services.map((e) => {
          return (
            <div>
              <button>
                <Link to={`/settings/updateService/${e.id}`}>Modificar Servicio</Link>
              </button>
              <h3>Categoria: {e.category.name}</h3>
              <h5>{e.name}</h5>
              <p>Dias Disponibles: {e.day}</p>
              <p>Precio: ${e.price}</p>
              <p>
                Descripcion del servicio <br />
                {e.description}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
