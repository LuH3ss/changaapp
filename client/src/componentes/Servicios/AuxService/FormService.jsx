import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getUserEmail,
  postService,
} from "../../../redux/actions";
import { useAuth } from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
//MATERIAL UI
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
  else if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]+[a-zA-ZÀ-ÖØ-öø-ÿ]?/.test(service.name))
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

export default function FormService() {
  const { user } = useAuth();
  const estado = useSelector((state) => state.filter);
  const [service, setService] = useState({
    name: "",
    img: "",
    user_id: "",
    description: "",
    price: "",
    category: [],
    day: [],
    hours: [],
    category_id: ""
  });

  const disptach = useDispatch();
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    disptach(getAllCategories());
    disptach(getUserEmail(user?.email));
  }, [disptach, user?.email]);

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
      [e.target.name]: value2,
    });
    setError(
      validate({
        ...service,
        [e.target.name]: e.target.value,
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

  //manejo de horarios de disponibilidad
  const handleTime = (e) => {
    let inputValue = document.getElementById('time');
    if(inputValue.value !== '' && !service.hours.includes(inputValue.value)){
      setService({
        ...service,
        hours: [...service.hours, inputValue.value]
      })
    }
  }

  const handleDeleteTime = (e) => {
    setService({
      ...service,
      hours: service.hours.filter(el => el !== e.target.value)
    })
  }

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
      category_id: dato,
    });
    setError(
      validate({
        ...service,
        category: service.category,
      })
    );
  };

  //ENVIAR FORMULARIO PARA CREAR SERVICIO
  const handleSubmit = (e) => {
    e.preventDefault();
    service.day = service.day.join(",")
    service.hours = service.hours.join(',')
    if(service.user_id === '') service.user_id = estado[0].id
    disptach(postService(service));
    setService({
      name: "",
      img: "",
      description: "",
      price: "",
      category: [],
      day: [],
      hours:[]
    });
    navigate("/home");
  };

  const styles = {
    container: {
      padding:'20px',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
    },
    containerForm: {
      width: "100%",
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
      alignItems: "center",
      width: "100%",
      display:'flex',
      flexDirection:'column'
    },
    input: {
      width: "100%",
      margin: "10px 0 10px 0",
      
    },
    time: {
      width: '70px',
      height: '30px',
      backgroundColor: 'transparent',
      border: 'solid grey 0.5px',
      borderRadius:'3px',
      padding: '7px',
      outline:'none'
    },
    hourAdded: {
      width:'70%', 
      borderRadius:'10px', 
      border:'solid grey 0.5px', 
      display:'flex'
    },
    bottomButtons: {
      display: "flex", 
      justifyContent: "space-around", 
      padding:'50px', 
      width:'50%'
    }
  };

  console.log(service)

  return (
      <Box style={styles.container}>
        <Box style={styles.containerForm}>
          <Typography sx={{margin:'20px'}} variant="h4">Publicá tu servicio</Typography>
          <form style={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{width:'100%', display:'flex'}}>
              <Box sx={{width:'50%', padding:'20px 10px 0 20px'}}>
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
                  <FormControl fullWidth sx={{padding:'7px 0'}}>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      value={service.category}
                      label={"Categoría"}
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
              </Box>
            <Box sx={{width:'50%', padding:'20px 20px 0 10px'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography 
                  variant="h7"
                  sx={{textAlign:'center', padding: '30px'}}
                >
                  Seleccioná días de disponibilidad
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                  {
                    ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map(el => {
                      return <Button 
                        value={el} 
                        onClick={(e)=>handleDay(e)}
                        variant="outlined"
                        sx={{color: "#1F2937", margin: '5px', padding:'5px'}}
                        >
                          {el}
                      </Button>
                    })
                  }
                </Box>
                
              </Box>

              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography 
                  variant="h7"
                  sx={{textAlign:'center', padding: '30px'}}
                >
                  Agregá horarios de disponibilidad
                </Typography>
                <Box sx={{display:'flex', width:'100%'}}>
                  <Box sx={{display:'flex', alignItems:'center', width:'30%'}}>
                    <input id="time" type="time" style={styles.time} />
                    <Button
                      onClick={handleTime}
                      sx={{ width: '40px',height: '45px',outline: 'none' }}
                      variant='outlined'
                    >
                      ➕
                    </Button>
                  </Box>
                  <Box style={styles.hourAdded}>
                    {
                      service?.hours.map(el=>{
                        return <Box sx={{display:'flex', alignItems:'center', padding:'5px'}}>
                          <Typography>{el}</Typography>
                          <Button 
                          value={el} 
                          onClick={(e)=>handleDeleteTime(e)} 
                          sx={{minWidth:'20px',padding:'0'}}
                          >
                            ✖
                          </Button>
                        </Box>
                      })
                    }
                  </Box>
                </Box>
              </Box>

              
            </Box>
            </Box>
              <Box style={styles.bottomButtons}>
                
                <Link style={{ textDecoration: "none" }} to="/home">
                  <Button sx={{ color: "#1F2937"}} variant='outlined'>
                    Volver atras
                  </Button>
                </Link>

                <Button 
                  sx={{ color: "#1F2937" }} 
                  type="submit" 
                  disabled={!btn}
                  variant='outlined'
                >
                  Crear
                </Button>
              </Box>
          </form>
        </Box>
      </Box>
  );
}
