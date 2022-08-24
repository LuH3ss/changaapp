import React from "react";
import { useSelector } from "react-redux";
import user from "./Register";

export default function Profile() {
  const infoUser = useSelector((state) => state.registerUser);
  console.log(infoUser);
  return (
    <div>
      <img src="" alt="profile photo" />
      <h2>Name: </h2>
      <h5>Address: </h5>
      <h5>Job: </h5>
      {/* SECCION PREGUNTAS FRECUENTES */}
      {/* SECCION RESEÑAS Y RAITING */}
      <button>Contact</button>
      <button>Update service</button>
      <button>Settings</button>
    </div>
  );
}
