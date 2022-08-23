import React from "react";
import "./css/footer.css";

export default function Footer() {
  return (
    <div class="footer">
      <div class="footer__nombre">
        <h1>ChangaApp</h1>
      </div>
      <div class="seccion__footer--lista">
        <ul class="footer__lista">
          <p>Categorias</p>
          <li class="footer__lista--item">
            <p>Electricidad</p>
          </li>
          <li class="footer__lista--item">
            <p>Agua</p>
          </li>
          <li class="footer__lista--item">
            <p>Jardineria</p>
          </li>
          <li class="footer__lista--item">
            <p>Gas</p>
          </li>
        </ul>
      </div>
      <div class="seccion__footer--lista">
        <ul class="footer__lista">
          <p>Legal</p>
          <li class="footer__lista--item">
            <p>Quienes Somos</p>
          </li>
          <li class="footer__lista--item">
            <p>Politica de Privacidad</p>
          </li>
          <li class="footer__lista--item">
            <p>Programa de Fidelidad</p>
          </li>
          <li class="footer__lista--item">
            <p>Anuncie Aqui</p>
          </li>
        </ul>
      </div>
      <div class="seccion__footer--lista">
        <ul class="footer__lista">
          <p>Desarrollado por</p>
          <li class="footer__lista--item">
            <p>Franco Fraticelli</p>
          </li>
          <li class="footer__lista--item">
            <p>Enrique Gomez Naar</p>
          </li>
          <li class="footer__lista--item">
            <p>Lucas Hess</p>
          </li>
          <li class="footer__lista--item">
            <p>Juan Pablo Cuadrelli</p>
          </li>
          <li class="footer__lista--item">
            <p>Agop Chorbadjian</p>
          </li>
          <li class="footer__lista--item">
            <p>Claudio Amaya</p>
          </li>
        </ul>
      </div>

      <form class="formulario">
        <h3 class="formulario__titulo">Contactanos</h3>
        <div class="formulario__campo">
          <label for="name">Nombre</label>
          <input
            name="name"
            type="text"
            class="formulario__nombre"
            id="name"
            required=""
            minlength="4"
            maxlength="40"
            data-tipo="name"
            placeholder="Juan Perez"
          />
        </div>
        <div class="formulario__campo">
          <label for="textarea">Escribe tu mensaje</label>
          <textarea
            name="message"
            id="message"
            class="formulario__texto"
            required=""
            maxlength="120"
            data-tipo="message"
          ></textarea>
        </div>
        <button class="formulario__boton">Enviar mensaje</button>
      </form>
    </div>
  );
}
