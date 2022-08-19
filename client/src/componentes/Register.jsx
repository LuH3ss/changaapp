import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import {useNavigate, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from "../redux/actions";
import { CLOUDINARY_API } from '../Secret/Secret.js'
import axios from "axios";

function validate(user) {
    let error = {}

    if(!user.firstName)  error.name = 'Debes ingresar un nombre'
    else if(!/^[a-z ,.'-]+$/i.test(user.firstName)) error.name = 'El nombre no puede contener numeros ni caracteres especiales'

    //ERROR APELLIDO
    else if(!user.lastName) error.lastname = 'Debes ingresar un apellido'
    else if(!/^[a-z ,.'-]+$/i.test(user.lastName)) error.lastname = 'El apellido no puede contener numeros ni caracteres especiales'
    
    //ERROR FECHA DE NACIMIENTO
    else if(!user.birthDate) error.birthDate = 'Debes ingresar una fecha de nacimiento'
    // else if(!/^(?:3[01]|[12][0-9]|0?[1-9])([-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(user.date)) error.date = 'El formanto de la fecha ingresada es incorrecto'

    //ERROR NUMERO DE TELEFONO
    else if(!/^[0-9]/.test(user.phone)) error.phone = 'No puedes ingresar letras, unicamente numeros'

    //ERROR EMAIL
    else if(!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(user.email)) error.email = 'El formato ingresado es invalido'

    //ERROR PASSWORD
    else if(!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(user.password)) error.password = 'La contraseña debe tener mas de 6 caracteres, al menos un digito, al menos un minuscula, al menos una mayuscula y al menos un caracter no alfanumerico'

    return error
}

export default function Register(){
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        phone: '',
        img: '',
        password: '',
        
    })
    const [boton, setBoton] = useState(false)
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const [fire, setFire] = useState('')
    
    
    const handleOnChange = async (e) => {
        e.preventDefault()
        
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...user,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleImage = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            const data = new FormData()
            data.append('file', file)
            data.append('upload_preset', 'changApp')
            console.log(file)
            const cloudinary = await axios.post(CLOUDINARY_API, data)
            
            setUser({
                ...user,
                img: cloudinary.data.secure_url
            })
        } catch (error) {
            console.log(error)
        }
        
        
    }
    
    // console.log(user.lastName)
    useEffect(() => {
        if(!error.firstName && !error.lastName && !error.birthDate && !error.phone && !error.img && !error.email && !error.password && user.firstName && user.lastName && user.birthDate &&
          user.email && user.password){
            setBoton(true)
          }else{
            setBoton(false)
          }

    }, [error,user])


    const handleOnSubmit = async (e) => {
        e.preventDefault(e)
        dispatch(registerUser(user))
        try {
            await signUp(user.email, user.password)
            navigate('/')
        } catch (error) {
            if(error.code === 'auth/weak-password'){
                setFire('La contraseña tiene que tener al menos 6 caracteres')
            }
            if(error.code === 'auth/email-already-in-use'){
                setFire('El email ya se encuentra registrado')
            }
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Registrarse</h1>
            {fire && <p>{fire}</p>}
            <form onSubmit={e => handleOnSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" name='firstName' value={user.firstName} onChange={handleOnChange}/>
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" name='lastName' value={user.lastName} onChange={handleOnChange}/>
                    {error.lastname && <p>{error.lastname}</p>}
                </div>
                <div>
                    <label>Fecha de Nacimiento: </label>
                    <input type="date" value={user.birthDate} name='birthDate' onChange={handleOnChange}/>
                    {error.birthDate && <p>{error.birthDate}</p>}
                </div>
                <div>
                    <label>Telefono / Celular: </label>
                    <input type="text" value={user.phone} name='phone' onChange={handleOnChange} />
                    {error.phone && <p>{error.phone}</p>}
                </div>
                <div>
                    <label>Foto de perfil</label>
                    <input type="file" accept='image/jpeg' name='img' onChange={handleImage} />
                    {error.photo && <p>{error.photo}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name='email' value={user.email} onChange={handleOnChange}/>
                    {error.email && <p>{error.email}</p>}
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name='password' value={user.password} onChange={handleOnChange}/>
                    {error.password && <p>{error.password}</p>}
                </div>
                
                <button type="submit" disabled={!boton}>Registrarse</button>
            </form>
            <Link to='/'>Volver</Link>
        </div>)
}