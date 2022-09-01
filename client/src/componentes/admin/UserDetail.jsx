
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServices, userById } from '../../redux/actions'
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { unstable_createCssVarsProvider } from '@mui/system';

export default function UserDetail() {
    const dispatch = useDispatch()
    const{ id }= useParams()
  
    useEffect(() => {
        dispatch(userById(id))
        dispatch(getAllServices())
        
    },[dispatch]
    )
    const user = useSelector(state => state.user)
    const allServices = useSelector(state => state.services)
    // const userServices = allServices.filter(serv => )
    const userSevices = allServices.filter(serv => serv.user_id === id)
 

    
  return (
    <Box component='section'>
      <Box component='div'>
        <Typography variant='h5'>User {user[0]?.id}</Typography>
        <Box component='div'>
          <img src={user.img} alt='Foto de usuario' />
        </Box>
        <Box component='div'>
          <ul>
            <li>Nombre: {user[0]?.firstName}</li>
            <li>Apellido: {user[0]?.lastName}</li>
            <li>Edad: {user[0]?.birthDate}</li>
            <li>Email: {user[0]?.email} </li>
            <li>Ubicación: {user[0]?.location}</li>
            <li>Banned: {user[0]?.banned}</li>
            <li>Description: {user[0]?.description}</li>
          </ul>
        </Box>
      </Box>
      <Box >
        <Typography variant='h4'>Servicios</Typography>
        {
          userSevices && userSevices.map(serv => {
            <Box component='div'></Box>
          })
        }

      </Box>
      <Box></Box>
      <Box></Box>

    </Box>
  )
}
