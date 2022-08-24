import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Password(){
    const {resetPassword } = useAuth()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handleReset = async (e) => {
        e.preventDefault()
        if(!email) setError('Debes ingresar un email')
        try {
            await resetPassword(email)
            setError('Email enviado correctamente, verifica tu casilla de correo. Redireccionando al inicio')
            setTimeout(() => {
                navigate('/')
            }, 5000)
        } catch (error) {
            setError(error.message)
        }
    }
    console.log(email)
    return(
        <div>
            <h1>Recuperar constraseña</h1>
            {/* <form onSubmit={e => handleReset(e)}> */}
                <label>Ingresa un email: </label>
                <input type="email" value={email} onChange={handleChange}/>
                <button type="button" onClick={handleReset}>Enviar</button>
            {/* </form> */}
            {error && <p>{error}</p>}
        </div>)
}