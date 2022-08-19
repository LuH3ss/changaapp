import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState('')
  const { login, loginGoogle, loginFacebook } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async(e) => {
    e.preventDefault();
    setError('')
    try {
      await login(user.email, user.password);     
      navigate("/home");
    } catch (error) {
      // setError(error.message)
      console.log(error.message)
    }
    
  };

  const handleGoogle = async (e) => {
    e.preventDefault()
    try {
      await loginGoogle()
      navigate('/home')
    } catch (error) {
      console.log('asd')
    }
  }

  const handleFacebook = async (e) => {
    e.preventDefault()
    try {
      await loginFacebook()
      navigate('/home')
    } catch (error) {
      console.log('Error facebook')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <Alert message={error}/>}
      <form onSubmit={(e) => handleSumbit(e)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Iniciar Sesion</button>
      </form>
        <p>Aun no te has registrado? <Link to='/register'>Registrar</Link></p>
        <button onClick={handleGoogle}>Iniciar Sesion con Google</button>
        <button onClick={handleFacebook}>Iniciar Sesion con Facebook</button>
    </div>
  );
}
