import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, postCategory, postService } from "../redux/actions";
import { CLOUDINARY_API } from "../Secret/Secret";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Servicios() {
  const [service, setService] = useState({
    name: "",
    img: "",
    description: "",
    review: "",
    price: "",
    category: [],
  });
  const disptach = useDispatch();
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const [categoryAdd, setCategoryAdd] = useState({
    name: "",
  });

  useEffect(() => {
    disptach(getAllCategories());
  }, [disptach]);

  
  //CONSTANTES PARA QUE EL USUARIO PUEDA ELEGIR LOS VALORES DE CADA INPUT AL CREAR UN SERVICIO
  const handleOnChange = (e) => {
    e.preventDefault();
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const datos = new FormData();
      datos.append("file", file);
      datos.append("upload_preset", "changApp");
      const cloudinary = await axios.post(CLOUDINARY_API, datos);
      setService({
        ...service,
        img: cloudinary.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCat = (dato) => {
    if (service.category) {
      if (service.category.includes(dato)) {
        console.log("ya lo agregaste");
      } else {
        service.category.push(dato);
      }
    }
    setService({
      ...service,
      category: service.category,
    });
  };
  //CONSTANTES PARA QUE EL USUARIO PUEDA AGREGAR UNA CATEGORIA QUE NO EXISTA
  const handleChangeCat = (e) => {
    e.preventDefault();
    setCategoryAdd({
      ...categoryAdd,
      name: e.target.value,
    });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    service.category.push(categoryAdd.name);
    disptach(postCategory(categoryAdd));
  };
  console.log(service.category);

  //ENVIAR FORMULARIO PARA CREAR SERVICIO
  const handleSubmit = (e) => {
    e.preventDefault();
    disptach(postService(service));
    setService({
      name: "",
      img: "",
      description: "",
      review: "",
      price: "",
    });
    navigate("/home");
  };

  return (
    <Box>
      <Box>
        <h1>Servicios</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre del Servicio</label>
            <input
              type="text"
              name="name"
              value={service.name}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label>Imagen del servicio</label>
            <input type="file" name="img" onChange={handleImage} />
          </div>
          <div>
            <p>Categorias</p>
            {categories &&
              categories.map((e) => {
                return (
                  <div key={e.id}>
                    <button type="button" onClick={() => handleCat(e.name)}>
                      {e.name}
                    </button>
                  </div>
                );
              })}
            <div>
              <input
                type="text"
                placeholder="Agregar categoria"
                name="name"
                value={categoryAdd.name}
                onChange={handleChangeCat}
              />
              <button type="submit" onClick={(e) => handleAddCategory(e)}>
                +
              </button>
            </div>
          </div>

          <div>
            <label>Descripcion</label>
            <input
              type="text"
              name="description"
              value={service.description}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label>Review</label>
            <input
              type="text"
              name="review"
              value={service.review}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label>Precio del servicio</label>
            <input
              type="text"
              name="price"
              value={service.price}
              onChange={handleOnChange}
            />
          </div>

          <button type="submit">Solicitar servicio</button>
        </form>
        <Link to="/home">
          <button>Volver atras</button>
        </Link>
      </Box>
    </Box>
  );
}
