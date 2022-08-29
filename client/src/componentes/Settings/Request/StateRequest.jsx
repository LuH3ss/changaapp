import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { getAllServices, updateRequest } from "../../../redux/actions";

export default function StateRequest() {
    const {user} = useAuth()
    const serviceState = useSelector(state => state.services)
    const dispatch = useDispatch()
    const filterEmail = serviceState.filter(state => state.user?.email === user?.email)
    const [btn, setBtn] = useState({
        state: '',
        id: ''
    })
    
    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])

    const handleOnClick = (e) => {
        if(btn.state === ''){
            setBtn({
                state:e.target.name,
                id:e.target.value
            });
            console.log(btn)
        }
        else if(btn.state !== e.target.name){
            document.getElementById(btn.state).checked = false;
            setBtn({
                state:e.target.name,
                id:e.target.value
            });
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(btn.state !== ''){
            dispatch(updateRequest(btn))
            window.location.reload(true)
        }
    }
    
    console.log(filterEmail)
    return(
        <div>
            <h1>Estado del Servicio</h1>
            {
                filterEmail.length === 0 ? <p>No tiene estados pendientes de servicios</p>
                : (
                    filterEmail.map(el => {
                        return(
                            
                                el.request[0]?.state !== 'pending' && el.request[0]?.state !== 'aceptado'  ? <p>Tu servicio {el.name} no recibio solicitudes nuevas</p> : 
                                    <div>
                                        <p>Nombre del servicio: {el.name}</p>
                                        <p>Estado: {el.request[0]?.state}</p>
                                        <p>Trabajo solicitado para el dia {el.request[0]?.day} a las {el.request[0]?.hours}hs</p>
                                        <form onSubmit={e => handleOnSubmit(e)}>
                                            <label>Aceptar</label>
                                            <input id="aceptado" type="checkbox" name='aceptado' value={el.request[0]?.id} onChange={(e)=>handleOnClick(e)}/>
                                            <label>Rechazar</label>
                                            <input id="rechazado" type="checkbox" name='rechazado' value={el.request[0]?.id} onChange={(e)=>handleOnClick(e)}/>
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

