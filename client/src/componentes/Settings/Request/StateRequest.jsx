import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { getAllServices, updateRequest } from "../../../redux/actions";
import {Link} from 'react-router-dom'

export default function StateRequest() {
    const {user} = useAuth()
    const serviceState = useSelector(state => state.services)
    const dispatch = useDispatch()
    const filterEmail = serviceState.filter(state => state.user?.email === user?.email)
    const [btn, setBtn] = useState({
        state: '',
        id: ''
    })
    console.log(filterEmail)
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
    
    return(
        <div>
            <h1>Estado del Servicio</h1>
            {
                filterEmail.length === 0 ? <p>Para ver los estados del servicio, primero debes publicar uno, dirigete a la seccion <Link to='/home/createService'>publicar servicio</Link></p>
                : filterEmail?.map(p => {
                    return p.request.length === 0 ? <p>No tienes estados pendientes de servicios</p>
                
                : (
                    p.request?.map(e => {
                         return (
                            e.state === 'rechazado' ? <p>La orden #{e.id} del servicio {filterEmail[0].name} fue rechazada</p> 
                            : <div>
                            <p>Nombre del servicio: {filterEmail[0]?.name}</p>
                            <p>Estado: {e.state}</p>
                            <p>Trabajo solicitado para el dia {e.day} a las {e.hours}hs</p>
                            {
                                e.state === 'aceptado' 
                                ? <form onSubmit={e => handleOnSubmit(e)}>
                                    <div>
                                        <label>Cancelar</label>
                                        <input type="checkbox" name='rechazado' value={e.id} onChange={handleOnClick}/>

                                    </div>
                                    <button type="submit">Actualizar</button>
                                  </form>
                                : <form onSubmit={e => handleOnSubmit(e)}>
                                <label>Aceptar</label>
                                 <input type="checkbox" id='aceptado' name='aceptado' value={e.id} onChange={handleOnClick} />
                                <label>Rechazar</label>
                                 <input type="checkbox" id='rechazado' name='rechazado' value={e.id} onChange={handleOnClick} />
                                 <div>
                                     <button>Confirmar</button>
                                 </div>
                             </form>
                            }
                        </div>
                         )
                            
                        
                    })
                )
            })
                }
        </div>)
}

