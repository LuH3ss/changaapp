import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { allRequest, deleteRequest, getUserEmail } from "../../../redux/actions";
import { Link } from 'react-router-dom'
import { Button } from "@mui/material";

export default function StateRequester(){
    const { user } = useAuth()
    const userState = useSelector(state => state.filter)
    const dispatch = useDispatch()
    
    //PARA TRAER LOS REQUEST
    const requestState = useSelector(state => state.allRequest)
    const filterById = requestState.filter(e => e.requester_id === userState[0]?.id)
    
    useEffect(() => {
        dispatch(getUserEmail(user?.email))
        dispatch(allRequest())
    }, [dispatch, user?.email])

    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(deleteRequest(e.target.id))
        alert('Solicitud cancelada exitosamente')
        window.location.reload(true)
    }

    const handleClear = (e) => {
        e.preventDefault()
        dispatch(deleteRequest(e.target.id))
        window.location.reload(true)
    }

    

    return(
        <div>
            <h1>Estado de los servicios solicitados</h1>
            {
                filterById.length === 0 ? <p>Aun no has realizado ninguna solicitud</p>
                : (
                    filterById.map(e => {
                        return(
                            <div>
                                <h3>{e.services?.name}</h3>
                                <p>El servicio esta solicitado para el dia {e.day} a las {e.hours}hs</p>
                                <p>Estado: {e.state}</p>
                                {
                                    e.state === 'rechazado' ? <Button id={e.id} onClick={handleClear}>Eliminar</Button> 
                                    : <div>
                                        {
                                            e.state === 'aceptado' ? <div>
                                                <p>Para pagar el servicio accede al siguiente <Link to='/home/services/payment'>link</Link></p>
                                                <p>Si quieres cancelar la solicitud aprieta el siguiente boton <Button id={e.id} onClick={handleOnClick}>Cancelar</Button></p>
                                            </div>
                                            
                                            : <p>Si quieres cancelar la solicitud aprieta el siguiente boton <Button id={e.id} onClick={handleOnClick}>Cancelar</Button></p>
                                        }
                                        
                                    </div> 
                                }
                            </div>
                        )
                    })
                )
            }
        </div>)
}