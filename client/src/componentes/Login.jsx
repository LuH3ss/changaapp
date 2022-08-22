import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login, loginGoogle, loginFacebook } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (error) {
      // setError(error.message)
      console.log(error.message);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      navigate("/home");
    } catch (error) {
      console.log("asd");
    }
  };

  const handleFacebook = async (e) => {
    e.preventDefault();
    try {
      await loginFacebook();
      navigate("/home");
    } catch (error) {
      console.log("Error facebook");
    }
  };

  const styles = {
    container:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#E5E7EB',
      color: '#1F2937'
    },
    login: {
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      alignItems: 'center',
    },
    form: {
      width: '100%',
    },
    button: {
      width: '100%',
      margin: '5px 0 5px 0'
    },
    input: {
      width: '100%',
      margin: '10px 0 10px 0'
    }
  }

  return (
    <Box style={ styles.container }>
      <Box style={ styles.login }>
        <Typography variant="h4" sx={{ marginBottom: '30px' }}>
            Login
        </Typography>
        {error && <Alert message={error} />}
        <form style={ styles.form } onSubmit={(e) => handleSumbit(e)}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
            <TextField id="outlined-basic" label="Email" variant="outlined"
              style={ styles.input }
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnChange}
            />
            <TextField id="outlined-basic" label="Contraseña" variant="outlined"
              style={ styles.input }
              type="password"
              name="password"
              value={user.password}
              onChange={handleOnChange}
            />
            <Button style={ styles.button } type="submit">Iniciar Sesion</Button>
          </Box>
        </form>
        <Typography variant="h6">
          Aun no te has registrado? 
          <Link style={{textDecoration: 'none'}} to="/register">
            <Button>Registrar</Button>
          </Link>
        </Typography>
        <Button style={ styles.button } onClick={handleGoogle}>Iniciar Sesion con Google</Button>
        <Button style={ styles.button } onClick={handleFacebook}>Iniciar Sesion con Facebook</Button>
      </Box>
    </Box>
  );
}
