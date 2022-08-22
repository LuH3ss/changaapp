import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, postService } from "../redux/actions";
import { CLOUDINARY_API } from "../Secret/Secret";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function validate(service) {
  let error = {};
  //ERROR NOMBRE
  if (!service.name) error.name = "Debes ingresar un nombre al servicio";
  else if (service.name.length < 3)
    error.name = "El nombre debe tener mas de tres caracteres";
  else if (!/^[a-z ñ]+$/i.test(service.name))
    error.name = "No puedes asignar numeros/caracteres especiales al nombre";
  //ERROR CATEGORIA
  else if (service.category.length !== 1)
    error.category = "Tiene que asignar alguna categoria";
  //ERROR DESCRIPCION
  else if (!service.description)
    error.description = "Debes ingresar una descripcion del servicio";
  else if (service.description < 10)
    error.description = "La descripcion es muy corta";
  else if (service.description > 150)
    error.description = "La descripcion es muy larga";
  //ERROR PRECIO
  // else if (!/^[0-9]$/.test(error.price)) error.price = 'Solo puedes ingresar numeros enteros'
  return error;
}

export default function Servicios() {
  const [service, setService] = useState({
    name: "",
    img: "",
    description: "",
    price: "",
    category: [],
  });
  const disptach = useDispatch();
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [btn, setBtn] = useState(false);
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
    e.preventDefault();
    const value = e.target.value;
    const value2 = value.charAt(0).toUpperCase() + value.slice(1);
    setService({
      ...service,
      [e.target.name] : value2
    });
    setError(
      validate({
        ...service,
        [e.target.name]: e.target.value,
      })
    );
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
        service.category.pop();
        service.category.push(dato);
      }
    }
    setService({
      ...service,
      category: service.category,
    });
    setError(
      validate({
        ...service,
        category: service.category,
      })
    );
  };

  console.log(service.category);

  //MANEJO DE ERRORES PARA EL FORMULARIO
  useEffect(() => {
    if (
      !error.name &&
      !error.description &&
      !error.price &&
      !error.category &&
      service.name &&
      service.description &&
      // service.img &&
      service.price &&
      service.category
    ) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [service, error]);

  //ENVIAR FORMULARIO PARA CREAR SERVICIO
  const handleSubmit = (e) => {
    e.preventDefault();
    disptach(postService(service));
    setService({
      name: "",
      img: "",
      description: "",
      price: "",
    });
    navigate("/home");
  };


  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
    },
    containerForm: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    form: {
      width: "100%",
    },
    input: {
      width: "100%",
      margin: "10px 0 10px 0",
    },
  };
  console.log(service);

  return (
    <Box style={styles.container}>
      <Box style={styles.containerForm}>
        <Typography variant="h4">Servicios</Typography>
        <form style={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <Box style={styles.box}>
            <TextField
              id="outlined-basic"
              label="Nombre del Servicio"
              variant="outlined"
              style={styles.input}
              type="text"
              name="name"
              value={service.name}
              onChange={handleOnChange}
            />
          </Box>

          <Box style={styles.box}>
            <Typography variant="h6">Imagen del Servicio</Typography>
            <input
              style={styles.input}
              type="file"
              name="img"
              onChange={handleImage}
            />
          </Box>
          <Box style={styles.box}>
            <Typography variant="h6">Categorías</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
              {/* <input
                style={styles.input}
                type="text"
                name="name"
                value={categoryAdd.name}
                onChange={handleChangeCat}
              />
              <button type="submit" onClick={(e) => handleAddCategory(e)}>
                +
              </button> */}
            </Box>
          </Box>

          <Box style={styles.box}>
            <TextField
              id="outlined-basic"
              label="Descripcón"
              variant="outlined"
              style={styles.input}
              type="text"
              name="description"
              value={service.description}
              onChange={handleOnChange}
            />
          </Box>
          {/* <Box style={styles.box}>
            <TextField
              id="outlined-basic"
              label="Review"
              variant="outlined"
              style={styles.input}
              type="text"
              name="review"
              value={service.review}
              onChange={handleOnChange}
            />
          </Box> */}
          <Box style={styles.box}>
            <TextField
              id="outlined-basic"
              label="Precio del servicio"
              variant="outlined"
              style={styles.input}
              type="number"
              name="price"
              value={service.price}
              onChange={handleOnChange}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button>
              <Link style={{ textDecoration: "none" }} to="/home">
                <label style={{ color: "#1F2937" }}>Volver atras</label>
              </Link>
            </Button>
            <Button sx={{ color: "#1F2937" }} type="submit" disabled={!btn}>
              Crear
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
