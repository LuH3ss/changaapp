import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
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

export default function Settings() {
  const {section} = useParams();

  const { user, logout } = useAuth();

  const [selected, setSelected] = useState(section);

  useEffect(() => {
    handleSelected(null, section)
  }, [section]);


  const handleClick = (e) => {
    logout();
  };

  const handleSelected = (e, id) => {
    const link = document.getElementById(id);
    const icon = document.getElementById(`${id}Icon`);
    const prevLink = document.getElementById(selected);
    const prevIcon = document.getElementById(`${selected}Icon`);

    prevLink.style='color: #1F2937; background-color: white; text-decoration:none';
    prevIcon.style='font-size:3rem;padding:0 0 0 4%;color:#1F2937';
    link.style='color: white; background-color: #1F2937; text-decoration:none';
    icon.style='font-size:3rem;padding:0 0 0 4%;color:white';
    
    setSelected(id);
  };

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
    listText:{
      fontWeight:'bold',
      fontSize:'1.3rem',
      padding:'3.5%'
    },
    selected:{
      color:'red'
    }
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

              <NavLink onClick={(e)=>handleSelected(e, 'profile')} id='profile' style={styles.links} to="profile">
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <AccountBoxIcon id="profileIcon" style={styles.icons}/>
                  <Typography style={styles.listText}>Perfil</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink onClick={(e)=>handleSelected(e, 'edit')} id="edit" style={styles.links} to="edit">
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <EditIcon id="editIcon" style={styles.icons}/>
                  <Typography style={styles.listText}>Editar Perfil</Typography>
                </Box>
              </NavLink>
              
              <Divider variant="inset" />

              <NavLink onClick={(e)=>handleSelected(e, 'notifications')} id="notifications" style={styles.links} to='notifications'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <NotificationsIcon id="notificationsIcon" style={styles.icons}/>
                  <Typography style={styles.listText}>Notificaciones</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink onClick={(e)=>handleSelected(e, 'services')} id="services" style={styles.links} to='services'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <WorkIcon id="servicesIcon" style={styles.icons}/>
                  <Typography style={styles.listText}>Servicios publicados</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink onClick={(e)=>handleSelected(e, 'request')} id="request" style={styles.links}to='request'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <EmailIcon id="requestIcon" style={styles.icons}/>
                  <Typography style={styles.listText}>Solicitudes recibidas</Typography>
                </Box>
              </NavLink>

              <Divider variant="inset" />

              <NavLink onClick={(e)=>handleSelected(e, 'requester')} id="requester" style={styles.links} to='requester'>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <SendIcon id="requesterIcon" style={styles.icons}/>
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
