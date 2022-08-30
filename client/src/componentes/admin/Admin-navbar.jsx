import React, { useState } from 'react'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

export default function Adminnavbar() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <Box>
      <Box component='div'
       onChange={handleChange}
       value={value}
       aria-label="Tabs where selection follows focus"
       selectionFollowsFocus
       sx={{ width: '100%', display:'flex', alignItems:'baseline', color:'white', backgroundColor:'black' }}
      >
        <Typography variant='h6'>ADMIN</Typography>
        <NavLink to='users'><Button sx={{color: 'white', textDecoration: 'none'}} label="USUARIOS">USUARIOS</Button></NavLink>
        <NavLink to='categories'><Button sx={{color: 'white', textDecoration: 'none'}} label="CATEGORIAS">CATEGORIAS</Button></NavLink>
      </Box>
      <Outlet />
    </Box>
  )
}
