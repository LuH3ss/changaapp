import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail, updateUser } from "../../../redux/actions";
import axios from "axios";
import { CLODUNIARY_API } from "../../../Secret/Secret";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const { user } = useAuth();
  //ESTADO PARA ACTUALIZAR
  const estado = useSelector((state) => state.filter);
  const navigate = useNavigate()
  const [input, setInput] = useState({
    img: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();

  //PARA TRAER LA DATA DESDE LA BASE DE DATOS

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  // PARA MANEJAR LOS NUEVOS DATOS INGRESADOS
  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "changApp");

      const cloudinary = await axios.post(CLODUNIARY_API, data);

      setInput({
        ...input,
        img: cloudinary.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // PARA GUARDAR LOS CAMBIOS
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.img === "") input.img = estado[0].img;
    if (input.lastName === "") input.lastName = estado[0].lastName;
    if (input.firstName === "") input.firstName = estado[0].firstName;
    if (input.phone === "") input.phone = estado[0].phone;
    dispatch(updateUser(user?.email, input));
    alert("Cambios guardados con exito");
    navigate('/settings/profile')
  };

  //PARA CONTROLAR QUE SI NO INGRESO NINGUN DATO NO PUEDA GUARDAR LOS CAMBIOS
  useEffect(() => {
    if (input.img || input.firstName || input.lastName || input.phone) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [input]);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Imagen:</label>

          <input type="file" onChange={handleImage} placeholder="asd" />
          {/* <img src={estado[0].img} alt="No se encontro" placeholder="asd" /> */}
        </div>
        <div>
          <label>Nombre de Usuario: </label>

          <input
            type="text"
            value={input.firstName}
            // defaultValue={estado[0].firstName}
            placeholder={estado[0].firstName}
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido del Usuario:</label>

          <input
            type="text"
            placeholder={estado[0].lastName}
            value={input.lastName}
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Numero de Contacto: </label>

          <input
            type="tel"
            placeholder={estado[0].phone}
            value={input.phone}
            name="phone"
            onChange={handleChange}
          />
        </div>
        <button disabled={btn}>Guardar Cambios</button>
      </form>
    </div>
  );
}