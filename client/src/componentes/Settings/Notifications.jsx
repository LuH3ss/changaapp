import React, { useEffect } from "react";
import {useSelector, useDispatch } from 'react-redux'
import { allNotifications, deleteNotification, getUserEmail } from "../../redux/actions";
import { useAuth } from '../../context/authContext'

export default function Notifications(){
    const {user} = useAuth()
    let notifications = useSelector(state => state.allNotifications)
    const userState = useSelector((state) => state.filter);
    const dispatch = useDispatch()
    notifications = notifications.filter(e => e.userNotificated_id === userState[0]?.id)
    useEffect(() => {
       dispatch(allNotifications())  
       dispatch(getUserEmail(user?.email)) 
    }, [dispatch, user?.email])
    
    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(deleteNotification(e.target.id))
        window.location.reload(true)
    }

    return(
        <div>
            <h1>Aca van las notificaciones</h1>
            {
                notifications.length === 0 ? <p>No tienes notificaciones nuevas</p>
                : notifications.map(e => {
                    return(<div key={e.id}>
                        <h4>Notificacion de {e.userNotification.firstName} <button id={e.id} onClick={handleOnClick}>X</button></h4>
                        <p>{e.message}</p>
                    </div>)
                })
            }
        </div>)
}