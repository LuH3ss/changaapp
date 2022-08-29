import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/authContext";
import { getAllCategories } from "../redux/actions";
import "./css/footer.css";

export default function Footer() {
  const { user } = useAuth();
  let category = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  category = category.slice(0, 4);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  console.log(category);

  return (
    <div className="footer">
      <div className="footer__nombre">
        <h1>ChangaApp</h1>
      </div>
      <div className="seccion__footer--lista">
        <ul>
          <p>Categorias</p>
          {category &&
            category.map((c) => {
              return (
                <div>
                  <li className="footer__lista--item">
                    <p>{c.name}</p>
                  </li>
                </div>
              );
            })}
          <li className="footer__lista--item">
            <p>Otras</p>
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
