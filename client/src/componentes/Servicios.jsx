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

  const styles = {
    container:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#E5E7EB',
      color: '#1F2937'
    },
    containerForm: {
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    form: {
      width: '100%',
    },
    input: {
      width: '100%',
      margin: '10px 0 10px 0'
    }
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.containerForm}>
        <Typography variant="h4">
            Servicios
        </Typography>
        <form style={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <Box style={styles.box}>
            <TextField id="outlined-basic" label="Nombre del Servicio" variant="outlined" 
              style={styles.input}
              type="text"
              name="name"
              value={service.name}
              onChange={handleOnChange}
            />
          </Box>
          <Box style={styles.box}>
            <Typography variant="h6">
              Imagen del Servicio
            </Typography>
            <input style={styles.input} type="file" name="img" onChange={handleImage} />
          </Box>
          <Box style={styles.box}>
            <Typography variant="h6">
              Categorías
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
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
                <input
                style={styles.input}
                type="text"
                name="name"
                value={categoryAdd.name}
                onChange={handleChangeCat}
              />
              <button type="submit" onClick={(e) => handleAddCategory(e)}>
                +
              </button>
            </Box>
          </Box>

          <Box style={styles.box}>
            <TextField id="outlined-basic" label="Descripcón" variant="outlined"
              style={styles.input}
              type="text"
              name="description"
              value={service.description}
              onChange={handleOnChange}
            />
          </Box>
          <Box style={styles.box}>
            <TextField id="outlined-basic" label="Review" variant="outlined"
              style={styles.input}
              type="text"
              name="review"
              value={service.review}
              onChange={handleOnChange}
            />
          </Box>
          <Box style={styles.box}>
            <TextField id="outlined-basic" label="Precio del servicio" variant="outlined"
              style={styles.input}
              type="text"
              name="price"
              value={service.price}
              onChange={handleOnChange}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <Button>
              <Link style={{textDecoration: 'none'}} to="/home">
                <label style={{color:'#1F2937'}}>Volver atras</label>
              </Link>
            </Button>
            <Button sx={{ color: '#1F2937' }}type="submit">Crear</Button>
          </Box>
        </form>
        
          
        
      </Box>
    </Box>
  );
}
