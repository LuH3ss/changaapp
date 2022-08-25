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
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


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


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handlerClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    logout();
    navigate("/");
  };
  return (
    <Box style={styles.container} className="navBar">
        <Typography variant="h4"><Link to='/home'>ChangApp</Link></Typography>
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
            <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
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
        <Link to ='/settings/profile'>
        <MenuItem>
          <Avatar /> Perfil
        </MenuItem>
        </Link>
        
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link to='/settings/edit'>Configuracion</Link>
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
