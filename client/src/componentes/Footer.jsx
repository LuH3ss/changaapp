import React from "react";
import { useAuth } from "../context/authContext";
import "./css/footer.css";

export default function Footer() {
  const {user} = useAuth()
  return (
    <div className="footer">
      <div className="footer__nombre">
        <h1>ChangaApp</h1>
      </div>
      <div className="seccion__footer--lista">
        <ul className="footer__lista">
          <p>Categorias</p>
          <li className="footer__lista--item">
            <p>Electricidad</p>
          </li>
          <li className="footer__lista--item">
            <p>Agua</p>
          </li>
          <li className="footer__lista--item">
            <p>Jardineria</p>
          </li>
          <li className="footer__lista--item">
            <p>Gas</p>
          </li>
        </ul>
      </div>
      <div className="seccion__footer--lista">
        <ul className="footer__lista">
          <p>Legal</p>
          <li className="footer__lista--item">
            <p>Quienes Somos</p>
          </li>
          <li className="footer__lista--item">
            <p>Politica de Privacidad</p>
          </li>
          <li className="footer__lista--item">
            <p>Programa de Fidelidad</p>
          </li>
          <li className="footer__lista--item">
            <p>Anuncie Aqui</p>
          </li>
        </ul>
      </div>
      <div className="seccion__footer--lista">
        <ul className="footer__lista">
          <p>Desarrollado por</p>
          <li className="footer__lista--item">
            <p>Franco Fraticelli</p>
          </li>
          <li className="footer__lista--item">
            <p>Enrique Gomez Naar</p>
          </li>
          <li className="footer__lista--item">
            <p>Lucas Hess</p>
          </li>
          <li className="footer__lista--item">
            <p>Juan Pablo Cuadrelli</p>
          </li>
          <li className="footer__lista--item">
            <p>Agop Chorbadjian</p>
          </li>
          <li className="footer__lista--item">
            <p>Claudio Amaya</p>
          </li>
        </ul>
      </div>

      <form className="formulario">
        <h3 className="formulario__titulo">Contactanos</h3>
        <div className="formulario__campo">
          <label>Nombre</label>
          <input
            name="name"
            type="text"
            className="formulario__nombre"
            id="name"

            required           
            data-tipo="name"
            placeholder={user?.email}

            

          />
        </div>
        <div className="formulario__campo">
          <label>Escribe tu mensaje</label>
          <textarea
            name="message"
            id="message"
            className="formulario__texto"

            required
            data-tipo="message"

            

          ></textarea>
        </div>
        <button className="formulario__boton">Enviar mensaje</button>
      </form>
    </div>
  );
}
