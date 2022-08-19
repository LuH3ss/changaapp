import React from "react";
import "../css/navBar.css";
import SearchBar from "../SearchBar";
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

      {user === null ? (
        console.log("nada")
      ) : (
        <button onClick={handleClick}>Cerrar Sesion</button>
      )}
    </div>
  );
}
