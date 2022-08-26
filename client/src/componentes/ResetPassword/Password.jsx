import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Nav from "../landing/LandingNav";
import { Link } from "react-router-dom";

export default function Password() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) setError("Debes ingresar un email");
    try {
      await resetPassword(email);
      setError(
        "Email enviado correctamente, verifica tu casilla de correo. Redireccionando al inicio..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Nav />
      <h1>Recuperar constraseña</h1>
      <div>
        <label>Ingresa un email: </label>
        <input type="email" value={email} onChange={handleChange} />
        <button type="button" onClick={handleReset}>
          Enviar
        </button>
        {error && <p>{error}</p>}
      </div>
      
      <Link to='/login'><button>Volver al Inicio de Sesion</button></Link>
    </div>
  );
}
