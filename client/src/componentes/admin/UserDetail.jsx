
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allRequest, getAllServices, userById, deleteService, deleteRequest, bannedState } from '../../redux/actions'
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";


export default function UserDetail() {
    const dispatch = useDispatch()
    const{ id }= useParams()
    const [estado, setState] = useState({banned: false}) 
    
    useEffect(() => {
      dispatch(userById(id))
      dispatch(getAllServices())
      dispatch(allRequest())
      
      
    },[dispatch]
    )
    const user = useSelector(state => state.user)
    const allServices = useSelector(state => state.services)
    // // const userServices = allServices.filter(serv => )
  
    const userServices = allServices?.filter(serv => serv.user_id === id)
  
    
    const allRequests = useSelector(state => state.allRequest)


    const userRequest = allRequests?.filter(req => req.services.user_id === id )
    console.log(userRequest, 'RECIBIDAS')
    const userRequestDone = allRequests?.filter(req => req.requester_id === id)

    const handleBanned = (id) => {
      dispatch(bannedState(id, {banned:!user[0]?.banned}))
      window.location.reload()
  
    }

  return (
    <Box component='section'>
      <Box component='div'>
        <Typography variant='h5'>User {user[0]?.id}</Typography>
        <Box component='div'>
          <img style={{width:'15%'}} src={user[0]?.img} alt='Foto de usuario' />
        </Box>
        <Box component='div'>
          <ul>
            <li>Nombre: {user[0]?.firstName}</li>
            <li>Apellido: {user[0]?.lastName}</li>
            <li>Edad: {user[0]?.birthDate}</li>
            <li>Email: {user[0]?.email} </li>
            <li>Ubicación: {user[0]?.location}</li>
            <li>Banned: {user[0]?.banned ? 'true' : 'false'}</li>
            <li>Description: {user[0]?.description}</li>
          </ul>
          <Button   onClick={() => handleBanned(user[0]?.id)}>{user[0]?.banned ? 'Habilitar'  : 'Deshabilitar'}  Usuario</Button>

        </Box>
      </Box>
      <Box component='div'>
        <Typography variant='h4'>Servicios</Typography>
        {
          userServices && userServices.map(serv => {
           return (
             <Box key={serv.id} component='div'>
              <ul >
                <li>ID: {serv.id}</li>
                <li>Nombre: {serv.name}</li>
                <li>Precio: {serv.price}</li>
                <li>Descripción: {serv.description}</li>
                <li>Dias/Disp: {serv.days}</li>
                <li>Horas/Disp: {serv.hours}</li>
              </ul> 
              <Button onClick={deleteService(serv.id)}>Borrar Servicio</Button>
             </Box>

           )
          })
        }

      </Box>
      <Box component='div'>
      <Typography variant='h4'>Solicitudes Recibidas</Typography>
        {
          userRequest && userRequest.map(req => {
           return (
             <Box key={req.id} component='div'>
              <ul >
                <li>ID: {req.id}</li>
                <li>Nombre: {req.name}</li>
                <li>Precio: {req.price}</li>
                <li>Descripción: {req.description}</li>
                <li>Dias/Disp: {req.days}</li>
                <li>Horas/Disp: {req.hours}</li>
              </ul> 
              <Button onClick={deleteRequest(req.id)}>Borrar Solicitud</Button>
             </Box>

           )
          })
        }

      </Box>
      <Box>
      <Typography variant='h4'>Solicitudes Hechas</Typography>
        {
          userRequestDone && userRequestDone.map(req => {
           return (
             <Box key={req.id} component='div'>
              <ul >
                <li>ID: {req.id}</li>
                <li>Nombre: {req.name}</li>
                <li>Precio: {req.price}</li>
                <li>Descripción: {req.description}</li>
                <li>Dias/Disp: {req.days}</li>
                <li>Horas/Disp: {req.hours}</li>
              </ul>
              <Button onClick={deleteRequest(req.id)}>Borrar Solicitud</Button> 
             </Box>

           )
          })
        }

      </Box>

    </Box>
  )
}
