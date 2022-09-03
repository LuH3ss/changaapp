import { Box, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, getAllCategories, getAllServices } from '../../redux/actions'
import Adminnavbar from './Admin-navbar'

export default function Admin() {
  const dispatch = useDispatch()
  const usersDb = useSelector(state => state.users)
  const servicesDb = useSelector(state => state.services)
  const categoriesDb = useSelector(state => state.categories)


  useEffect(() => {
    dispatch(getAllServices())
    dispatch(getAllCategories())
    dispatch(allUsers())
  }, [dispatch])


  return (
    <Box component='section'>
      <Box><Typography>USUARIOS</Typography><Typography>{usersDb.length}</Typography></Box>
      <Box><Typography>SERVICIOS</Typography><Typography>{servicesDb.length}</Typography></Box>
      <Box><Typography>CATEGORIAS</Typography><Typography>{categoriesDb.length}</Typography></Box>
      
       
    </Box>
  )
}
