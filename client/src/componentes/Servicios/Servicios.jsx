import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getUserEmail, postService } from "../../redux/actions";
import { CLOUDINARY_API } from "../../Secret/Secret";
import {useAuth} from '../../context/authContext'
import Navbar from "../PrivateRoute/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";




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
  const {user} = useAuth()
  const estado = useSelector(state => state.filter)
  const [service, setService] = useState({
    name: "",
    img: "",
    user_id: '',
    description: "",
    price: "",
    category: [],
    day: [],
    category_id: ''
  });
  // console.log(estado[0].id)
  const disptach = useDispatch();
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    disptach(getAllCategories());
    disptach(getUserEmail(user?.email))
    
  }, [disptach, user?.email]);

  console.log(categories)

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

  const handleCat = (dato, ) => {
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
      category_id: dato
    });
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

  //Manejo de días de disponibilidad
  const handleDay = (e) => {
    if(!service.day.includes(e.target.value)){
      e.target.style.cssText = 'color: #E5E7EB; background-color: #1F2937';
      setService({
        ...service,
        day: [...service.day, e.target.value]
      });
    }else{
      e.target.style.cssText = 'color: #1F2937; background-color: #E5E7EB';
      setService({
        ...service,
        day: service.day.filter(el => el !== e.target.value)
      });
    } 
  }
  console.log(service.day)
  //ENVIAR FORMULARIO PARA CREAR SERVICIO
  const handleSubmit = (e) => {
    
    service.day = service.day.join(",")
    e.preventDefault();
    if(service.user_id === '') service.user_id = estado[0].id
    disptach(postService(service));
    setService({
      name: "",
      img: "",
      description: "",
      price: "",
      category: [],
      day: []
      
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
      width: "50%",
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
    time: {
      width: '70px',
      height: '30px',
      marginTop: '10px',
      backgroundColor: 'transparent',
      border: 0,
      padding: '7px'
    }
  };
  

  return (
    <div>
      <Navbar/>
      {
        user?.email === null 
        ? <p>
        No tienes acceso a estos datos ya que ingresaste como un usuario
        anonimo. Ve a la seccion de registrar para poder utilizar estos
        servicios.
        <Link to="/register">Registrarse</Link>
      </p>
        : <Box style={styles.container}>
        <Box style={styles.containerForm}>
          <Typography variant="h4">Crear Servicio</Typography>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                <Select
                  value={service.category}
                  label="Categoría"
                  onChange={(e) => handleCat(e.target.value)}
                >
                  {
                    categories?.map(el => {
                      return <MenuItem value={el.id}>{el.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Box>
  
            <Box style={styles.box}>
              <TextField
                id="outlined-basic"
                label="Descripción"
                variant="outlined"
                style={styles.input}
                type="text"
                name="description"
                value={service.description}
                onChange={handleOnChange}
              />
            </Box>
            
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
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <Typography 
                variant="h7"
                sx={{textAlign:'center', padding: '10px'}}
              >
                Seleccionar días de disponibilidad
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                {
                  ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map(el => {
                    return <Button 
                      value={el} 
                      onClick={(e)=>handleDay(e)}
                      variant="outlined"
                      sx={{color: "#1F2937", margin: '5px'}}
                      >
                        {el}
                    </Button>
                  })
                }
              </Box>
              
            </Box>

            <Box style={styles.box}>
              <Typography 
                variant="h7"
                sx={{textAlign:'center', padding: '10px'}}
              >
                Agregar horarios de disponibilidad
              </Typography>
              <input type="time" style={styles.time} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              
              <Link style={{ textDecoration: "none" }} to="/home">
                <Button sx={{ color: "#1F2937" }}>
                  Volver atras
                </Button>
              </Link>
              
              <Button sx={{ color: "#1F2937" }} type="submit" disabled={!btn}>
                Crear
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      }
    </div>
  );
}
