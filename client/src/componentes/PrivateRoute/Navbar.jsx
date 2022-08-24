import React, { useState } from "react";
import "../css/navBar.css";
import SearchBar from "../SearchBar";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const styles = {
  container:{
    padding: '20px 0 20px 0', 
    backgroundColor: '#1F2937',
    color: 'white'
  },
  button: {
    color: 'white'
  }
}


export default function Navbar({ user, handleClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlerClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box style={styles.container} className="navBar">
        <Typography variant="h4">ChangApp</Typography>
      <SearchBar style={styles.button} />
      <div>
        <Link style={{textDecoration: 'none'}} to='/home/createService'>
          <Button style={styles.button}>Crear Servicio</Button>
        </Link>
      </div>
      <Tooltip title="Account settings">
          <IconButton
            onClick={handlerClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link style={{textDecoration: 'none', color:'black'}}  to='/profile'>
        <MenuItem >
          <Avatar /> Profile
        </MenuItem>
        </Link>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <MenuItem onClick={handleClick} >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesion
        </MenuItem>
      </Menu>
    </Box>
  );
}
