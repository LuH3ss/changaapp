import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers } from '../../redux/actions';

export default function Users() {

   
   const dispatch = useDispatch()
   const usersDb = useSelector(state => state.users)
   useEffect(() => {
   dispatch(allUsers())
   }, [dispatch])

 
   


console.log(usersDb)

   const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellido', width: 130 },
    {
      field: 'birthDate',
      headerName: 'Edad',
      type: 'number',
      width: 90,
    },
    {
        field: 'location',
        headerName: 'Zona',
        width: '70'
    },
    {
        field: 'banned',
        headerName:'Banned?'
        
    }
]


    
  return (
    <div style={{ height: 400, width: '100%', background:'grey' }}>
    <DataGrid
      columns={columns}
      rows={usersDb}
      pageSize={5}
      rowsPerPageOptions={[5]}
      options={{
        search: true}
      }
    />
    
  </div>
  )
}
