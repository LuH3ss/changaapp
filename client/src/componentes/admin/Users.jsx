import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { allUsers } from '../../redux/actions';
import { Link } from '@mui/material';
import MaterialTable from 'material-table'
export default function Users() {

   
   const dispatch = useDispatch()
   const usersDb = useSelector(state => state.users)
   useEffect(() => {
   dispatch(allUsers())
   }, [dispatch])

   const columns = [
    { field: 'id', title: 'ID', width: 70 },
    { field: 'firstName', title: 'Nombre', width: 130 },
    { field: 'lastName', title: 'Apellido', width: 130 },
    {
      field: 'birthDate',
      title: 'Edad',
      type: 'number',
      width: 90,
    },
    {
        field: 'location',
        title: 'Zona',
        width: '70'
    },
    {
        field: 'banned',
        title:'Banned?'
        
    },
    {
      field: 'profile',
      title: 'Perfil/Detalle',
      render: rowsData => <Link href={`users/${rowsData.id}`} target="_blank">Detalle</Link>
    }
    
]
 

    
  return (
    <div >
    <MaterialTable 
    title="Data de Usuarios"
    data={usersDb}
    columns={columns}
    options={{ debounceInterval: 700, padding: "dense", searching: false }}
    style={{ height: '100%', width: '100%', background:'grey', fontSize:'1em', color:'white' }}
    />
    
  </div>
  )
}
