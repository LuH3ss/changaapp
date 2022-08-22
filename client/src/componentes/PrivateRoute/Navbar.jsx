import React from "react";
import "../css/navBar.css";
import SearchBar from "../SearchBar";
import { Link } from 'react-router-dom'

export default function Navbar({ user, handleClick }) {
  return (
    <div className="navBar">
      <div className="logo">
        <h1>ChangApp</h1>
      </div>
      <SearchBar />
      <div className="buttons">
        <button>Menu</button>
      </div>
      <div>
        <Link to='/home/createService'>
          <button>Crear Servicio</button>
        </Link>
      </div>

      {user === null ? (
        console.log("nada")
      ) : (
        <button onClick={handleClick}>Cerrar Sesion</button>
      )}
    </div>
  );
}
