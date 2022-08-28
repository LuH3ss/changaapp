import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { allRequest, getUserEmail } from "../../../redux/actions";

export default function StateRequester(){
    const { user } = useAuth()
    const userState = useSelector(state => state.filter)
    const dispatch = useDispatch()
    //PARA TRAER LOS REQUEST
    const requestState = useSelector(state => state.allRequest)
    const filterById = requestState.filter(e => e.requester_id === userState[0]?.id)
    console.log(filterById)

    useEffect(() => {
        dispatch(getUserEmail(user?.email))
        dispatch(allRequest())
    }, [dispatch, user?.email])

    return(
        <div>
            <h1>Estado de los servicios solicitados</h1>
            {
                filterById.length === 0 ? <p>No hiciste ninguna solicitud</p>
                : (
                    filterById.map(e => {
                        return(
                            <div>
                                <h3>{e.services?.name}</h3>
                                <p>El servicio esta solicitado para el dia {e.day} a las {e.hours}hs</p>
                                <p>Estado: {e.state}</p>
                                {
                                    e.state === 'rechazado' ? <button>Eliminar</button> 
                                    : <div>
                                        <p>La solicitud se encuentra en estado pendiente/aceptado, si deseas eliminarla apreta el siguiente boton <button>Eliminar</button></p>
                                        
                                    </div> 
                                }
                            </div>
                        )
                    })
                )
            }
        </div>)
}