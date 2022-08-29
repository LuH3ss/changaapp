import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { deleteService, getUserEmail } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function PublicServices() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log(userState);

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteService(e.target.id))
    window.location.reload(true)
  }
  
  return (
    <div>
      <h1>Servicios publicados</h1>
      {userState[0]?.services?.length === 0 ? (
        <div>
          <p>Este usuario no tiene ningun servicio registrado</p>
          <p>Si quieres publicar servicios, dirigete a la seccion <Link to='/home/createService'>crear servicios</Link> </p>
        </div>
      ) : (
        userState[0]?.services.map((e) => {
          return (
            <div>
              <Link to={`/settings/updateService/${e.id}`}><button>Modificar Servicio</button></Link>
              <button id={e.id} onClick={handleDelete} >Borrar Servicio</button>
              <h3>Categoria: {e.category.name}</h3>
              <h5>{e.name}</h5>
              <p>Dias disponibles: {e.day}</p>
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
