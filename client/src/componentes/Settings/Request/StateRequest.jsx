import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { deleteRequest, getAllServices, updateRequest } from "../../../redux/actions";

export default function StateRequest() {
    const {user} = useAuth()
    const serviceState = useSelector(state => state.services)
    const dispatch = useDispatch()
    const filterEmail = serviceState.filter(e => e.user?.email === user?.email)
    const [btn, setBtn] = useState({
        state: '',
        id: ''
    })
    
    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])

    const handleOnClick = (e) => {
        e.preventDefault()
        setBtn({
            ...btn,
            state: e.target.name,
            id: e.target.id
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        // if(btn.state === 'rechazado'){
        //     dispatch(deleteRequest(e.target.id))
        //     dispatch(updateRequest(btn))
        // }else {
        //     dispatch(updateRequest(btn))
        // }
        dispatch(updateRequest(btn))
        window.location.reload(true)
    }
    
    console.log(btn.id)
    return(
        <div>
            <h1>Estado del Servicio</h1>
            {
                filterEmail.length === 0 ? <p>No tiene estados pendientes de servicios</p>
                : (
                    filterEmail.map(e => {
                        return(
                            
                                e.request[0]?.state !== 'pending' && e.request[0]?.state !== 'aceptado'  ? console.log('asd') : 
                                    <div>
                                        <p>Nombre del servicio: {e.name}</p>
                                        <p>Estado: {e.request[0]?.state}</p>
                                        <p>Trabajo solicitado para el dia {e.request[0]?.day} a las {e.request[0]?.hours}hs</p>
                                        <form onSubmit={e => handleOnSubmit(e)}>
                                            <label>Aceptar</label>
                                            <input type="checkbox" name='aceptado' id={e.request[0]?.id} onChange={handleOnClick} checked={btn === 'rechazado' ? true : false}/>
                                            <label>Rechazar</label>
                                            <input type="checkbox" name='rechazado' id={e.request[0]?.id} onChange={handleOnClick} checked={btn === 'rechazado' ? true : false}/>
                                            <div>
                                                <button>Confirmar</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            
                        
                    })
                )
            }
        </div>)
}

