import React, { useEffect, useState } from "react";
import {useAuth} from '../../context/authContext'
import {useDispatch, useSelector } from 'react-redux'
import { getUserEmail, registerUser, updateUser } from "../../redux/actions";
import axios from "axios";
import {CLODUNIARY_API} from '../../Secret/Secret'
import NavBar from '../PrivateRoute/Navbar'
import { Link } from "react-router-dom";

export default function Setting(){
    const {user} = useAuth()
    //ESTADO PARA ACTUALIZAR
    const estado = useSelector(state => state.filter)
    //ESTADO PARA CARGAR LOS DATOS EN NUESTRA BASE DE DATOS (FACEBOOK O GOOGLE)
    // const state = useSelector(state => state.registerUser)
    const [input, setInput] = useState({
        img: '',
        firstName: '',
        lastName: '',
        phone: '',

    })
    const [fire, setFire] = useState({
        email: '',
        img: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: ''
    })
    const [btn, setBtn] = useState(false)
    const dispatch = useDispatch()
    console.log(estado)    
    //PARA TRAER LA DATA DESDE LA BASE DE DATOS
    useEffect(() => {
        dispatch(getUserEmail(user?.email))
    }, [dispatch, user?.email])

    //ESTOS HANDLES SON PARA EL CASO EN QUE LOGEA CON FACEBOOK O GOOGLE
    const handleOnChange = (e) => {
        e.preventDefault()
        setFire({
            ...fire,
            [e.target.name]: e.target.value
        })
    }
    console.log(user?.photoURL)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(fire.img === '') fire.img = user?.photoURL
        if(fire.email === '') fire.email = user?.email
        dispatch(registerUser(fire))
        window.location.reload(true)
    }
    // PARA MANEJAR LOS NUEVOS DATOS INGRESADOS
    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = async (e) => {
        e.preventDefault();
        try {
          const file = e.target.files[0];
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "changApp");
          console.log(file);
          const cloudinary = await axios.post(CLODUNIARY_API, data);
    
          setInput({
            ...input,
            img: cloudinary.data.secure_url,
          });
        } catch (error) {
          console.log(error);
        }
      };

    // PARA GUARDAR LOS CAMBIOS  
    const handleSubmit = (e) => {
        e.preventDefault()
        if(input.img === '') input.img = estado[0].img
        if(input.lastName === '') input.lastName = estado[0].lastName
        if(input.firstName === '') input.firstName = estado[0].firstName
        if(input.phone === '') input.phone = estado[0].phone
        dispatch(updateUser(user?.email,input))
        alert('Cambios guardados con existo')
        window.location.reload(true)
    }

    //PARA CONTROLAR QUE SI NO INGRESO NINGUN DATO NO PUEDA GUARDAR LOS CAMBIOS
    useEffect(() => {
        if(input.img || input.firstName || input.lastName || input.phone){
            setBtn(false)
        }else{
            setBtn(true)
        }
    }, [input])

    //PARA CONTROLAR QUE INGRESE TODOS LOS DATOS (SINO SE ROMPE DESDE LA BASE DE DATOS)
    useEffect(() => {
        if(fire.lastName && fire.firstName && fire.birthDate && fire.phone){
            setBtn(false)
        }else {
            setBtn(true)
        }
    }, [fire])
    return(
        <div>
            <NavBar/>
            <h1>Modificar perfil</h1>
            {
                user?.email === null ? <p>No tienes acceso a estos datos ya que ingresaste como un usuario anonimo. Ve a la seccion de registrar para poder utilizar estos servicios.
                    <Link to='/register'>Registrarse</Link>
                </p>
                : 
                    estado.length === 1 
                    ? 
                    <form onSubmit={e => handleSubmit(e)}>
                        <div>
                            <label>Imagen:</label><br />
                            <input type="file" onChange={handleImage} placeholder="asd"/>
                            <img src={estado[0].img} alt="No se encontro" placeholder="asd"/>
                        </div>
                        <div>
                            <label>Nombre de Usuario: </label><br />
                            <input type="text" placeholder={estado[0].firstName} value={input.firstName} name='firstName' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Apellido del Usuario:</label><br />
                            <input type="text" placeholder={estado[0].lastName} value={input.lastName} name='lastName' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Numero de Contacto: </label><br />
                            <input type="text" placeholder={estado[0].phone} value={input.phone} name='phone' onChange={handleChange}/>
                        </div>
                        <button disabled={btn}>Guardar Cambios</button>
                    </form>
                    : <div>
                        <h4>Completar tus datos antes de seguir</h4>
                        <form onSubmit={e => handleOnSubmit(e)}>
                            <div>
                                <label>Nombre de usuario: </label>
                                <input type="text" name='firstName' value={fire.firstName}  onChange={handleOnChange} />
                            </div>
                            <div>
                                <label>Apellido del usuario: </label>
                                <input type="text" name="lastName" value={fire.lastName} onChange={handleOnChange}  />
                            </div>
                            <div>
                                <label>Fecha de nacimiento: </label>
                                <input type="date" name="birthDate" value={fire.birthDate} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label>Numero de telefono: </label>
                                <input type="text" name="phone" value={fire.phone} onChange={handleOnChange} />
                            </div>
                            <button type="submit" disabled={btn}>Cargar Datos</button>
                        </form>
                    </div>
                
            }
            
            
        </div>)
}