import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet, useLocation} from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Navbar from "../PrivateRoute/Navbar";
import Footer from "../Footer";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Settings(id) {
  
  const location = useLocation()
  const { user, logout } = useAuth();
 
  const handleClick = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSelected = ({ isActive }) => {
    return{
      
      color: isActive ? '#fff' : '#1F2937',
      backgroundColor: isActive ? '#1F2937' : '#fff',
      textDecoration: isActive ? 'none' : 'none'
      
    }
  }

  const styles={
    container:{
      display:'flex', 
      width:'100%', 
      alignItems:'start', 
      justifyContent:'center', 
      gap:'20px',
    },
    links:{
      textDecoration:'none',
      color:"#1F2937",
    },
    icons:{
      fontSize:'3rem',
      padding:'0 0 0 4%',
      color:"#1F2937"
    },
    icons2:{
      fontSize:'3rem',
      padding:'0 0 0 4%',
      color:"#fff"
    },
    listText:{
      fontWeight:'bold',
      fontSize:'1.3rem',
      padding:'3.5%'
    },
    selected:{
      color:'red'
    },
    
  }
  
  return (
    <Box>

      <Navbar />
        <Box style={styles.container} variant='section'>
            <Box sx={{display:'flex',width:'30%', flexDirection:'column', borderRight:'solid grey 1px', padding:'10px 0 20px 0', fontSize:'1.2rem'}}>
              
              <NavLink style={styles.links} to='/home'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <HomeIcon style={styles.icons}/>
                  <Typography style={styles.listText}>Ir al inicio</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} id='profile'  to="profile">
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <AccountBoxIcon id="profileIcon" style={location?.pathname === '/settings/profile' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Perfil</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)}  to="edit">
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <EditIcon id="editIcon" style={location?.pathname === '/settings/edit' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Editar Perfil</Typography>
                </Box>
              </NavLink>
              
              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='notifications'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <NotificationsIcon id="notificationsIcon" style={location?.pathname === '/settings/notifications' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Notificaciones</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='services'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <WorkIcon id="servicesIcon" style={location?.pathname === '/settings/services' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Servicios publicados</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='request'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <EmailIcon id="requestIcon" style={location?.pathname === '/settings/request' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Solicitudes recibidas</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={(e)=>handleSelected(e)} to='requester'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <SendIcon id="requesterIcon" style={location?.pathname === '/settings/requester' ? styles.icons2 : styles.icons}/>
                  <Typography style={styles.listText}>Solicitudes enviadas</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink style={styles.links} to='/login' onClick={handleClick}>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <LogoutIcon style={styles.icons}/>
                  <Typography style={styles.listText}>Cerrar Sesion</Typography>
                </Box>
              </NavLink>
            </Box>
            

            <Outlet />
        </Box>
      <Footer></Footer>
    </Box>
);
}
