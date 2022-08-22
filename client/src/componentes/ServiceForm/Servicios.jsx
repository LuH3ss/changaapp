import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, postService } from "../../redux/actions";
import { CLOUDINARY_API } from "../../Secret/Secret";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import s from './Servicios.module.css'

function validate(service) {
  let error = {};
  //ERROR NOMBRE
  if (!service.name) error.name = "Debes ingresar un nombre al servicio";
  else if (service.name.length < 3)
    error.name = "El nombre debe tener mas de tres caracteres";
  else if (!/^[a-z ñ]+$/i.test(service.name))
    error.name = "No puedes asignar numeros/caracteres especiales al nombre";
  //ERROR CATEGORIA
  else if (!service.category)
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
    category: "",
  });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  //CONSTANTES PARA QUE EL USUARIO PUEDA ELEGIR LOS VALORES DE CADA INPUT AL CREAR UN SERVICIO
  const handleOnChange = (e) => {
    const {value} = e.target
    e.preventDefault();
    setService({
      ...service,
      [e.target.name] : value.charAt(0).toUpperCase() + value.slice(1)
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

  const[activeCat,setActiveCat]=useState('');

  const handleCat = (e) => {
    e.preventDefault()
    //id hace referencia al nombre de la categoria
    const category = e.target.id;
    if(category === service.category)return;
    setService((prevState)=>{
      return{
        ...prevState,
        category: category
      }
    });
    setActiveCat(category);
    setError(
      validate({
        ...service,
        category: service.category,
      })
    );
  };

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
    dispatch(postService(service));
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
                categories.map((c) => {
                  return (
                    <div key={c.id}>
                      <button id={c.name} className={activeCat === c.name?s.active_cat+' '+s.cat:s.cat} onClick={handleCat}>
                        {c.name}
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
              label="Descripcion"
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
