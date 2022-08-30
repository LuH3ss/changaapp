import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { getUserEmail, registerUser } from "../../../redux/actions";

function validate(fire) {
  let error = {};

  if (!fire.firstName) error.name = "Debes ingresar un nombre";
  else if (!/^[a-z ñ]+$/i.test(fire.firstName))
    error.name = "El nombre no puede contener numeros ni caracteres especiales";
  //ERROR APELLIDO
  else if (!fire.lastName) error.lastname = "Debes ingresar un apellido";
  else if (!/^[a-z ñ]+$/i.test(fire.lastName))
    error.lastname =
      "El apellido no puede contener numeros ni caracteres especiales";
  //ERROR FECHA DE NACIMIENTO
  else if (!fire.birthDate)
    error.birthDate = "Debes ingresar una fecha de nacimiento";
  else if (fire.birthDate < 18)
    error.birthDate =
      "Para registrarte a esta plataforma debes ser mayor de 18 años";
  // ERROR UBICACION
  else if (!/^[a-z ñ , ]+$/i.test(fire.location))
    error.location = "La direccion debe ser valida";

  return error;
}

export default function CompleteProfile() {
  const { user } = useAuth();
  const [fire, setFire] = useState({
    email: "",
    img: "",
    firstName: "",
    lastName: "",
    description: "",
    birthDate: "",
    location: "",
  });
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  //PARA TRAER LA DATA DE BASE DE DATOS
  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  //PARA QUE NO PONGAN CUALQUIER INFORMACION
  useEffect(() => {
    if (
      fire.lastName &&
      fire.firstName &&
      fire.birthDate &&
      fire.location &&
      !error.birthDate &&
      !error.firstName &&
      !error.lastName &&
      !error.description &&
      !error.location
    ) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [fire, error]);
  //ESTOS HANDLES SON PARA EL CASO EN QUE LOGEA CON FACEBOOK O GOOGLE
  const handleOnChange = (e) => {
    e.preventDefault();
    setFire({
      ...fire,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...fire,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (fire.img === "") fire.img = user?.photoURL;
    if (fire.email === "") fire.email = user?.email;
    dispatch(registerUser(fire));
    window.location.reload(true);
  };
  return (
    <div>
      <h4>Completar tus datos antes de seguir</h4>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div>
          <label>Nombre de usuario: </label>
          <input
            type="text"
            name="firstName"
            value={fire.firstName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Apellido del usuario: </label>
          <input
            type="text"
            name="lastName"
            value={fire.lastName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Edad: </label>
          <input
            type="number"
            name="birthDate"
            value={fire.birthDate}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Ubicacion:</label>
          <input
            type="text"
            name="location"
            value={fire.location}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="textarea"
            name="description"
            value={fire.description}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" disabled={btn}>
          Cargar Datos
        </button>
      </form>
    </div>
  );
}
