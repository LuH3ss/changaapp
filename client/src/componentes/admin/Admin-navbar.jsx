import React, { useState } from 'react'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Adminnavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

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
        <NavLink to='categories'>
          <Button  
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color: 'white', textDecoration: 'none'}}
        label="CATEGORIAS">CATEGORIAS</Button></NavLink>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{color: 'white', textDecoration: 'none',  background: '#ffffff',
        opacity: '0.8'}}
      >
        <NavLink  sx={{color: 'white', textDecoration: 'none', backgroundColor:'black'}} to='createCategory'><MenuItem 
        sx={{color: 'white', textDecoration: 'none', backgroundColor:'black'}}
        onClick={handleClose}>Agregar</MenuItem></NavLink>
       
      </Menu>
      </Box>
      <Outlet />
    </Box>
  )
}
