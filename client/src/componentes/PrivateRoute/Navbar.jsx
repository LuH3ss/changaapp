import React from "react";
import "../css/navBar.css";
import SearchBar from "../SearchBar";
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const styles = {
  container:{
    padding: '20px 0 20px 0', 
    backgroundColor: '#1F2937',
    color: 'white'
  },
  button: {
    color: 'white'
  }
}

export default function Navbar({ user, handleClick }) {
  return (
    <Box style={styles.container} className="navBar">
        <Typography variant="h4">ChangApp</Typography>
      <SearchBar style={styles.button} />
      <div className="buttons">
        <Button style={styles.button}>Menu</Button>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to='/home/createService'>
          <Button style={styles.button}>Crear Servicio</Button>
        </Link>
      </div>

      {user === null ? (
        console.log("nada")
      ) : (
        <Button style={styles.button} onClick={handleClick}>Cerrar Sesion</Button>
      )}
    </Box>
  );
}
