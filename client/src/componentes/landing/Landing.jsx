import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../css/landing.css'
import CardLanding from './CardLanding'

export default function Landing() {
  return (
    <Container maxWidth='xl' >
        <Box className="landing-welcome" variant="section">
            <Typography variant='h3'>Bienvenido/a a</Typography>
            <Typography variant='h1'>CHANGAPP</Typography>
            <Button variant='outlined' href='#mision'>Conocenos</Button>
        </Box>
        <Box variant="section" id='mision'>
            <Box variant="div" className='whoWeAre-welcome'>
                <Box variant="div" className='queEsChangapp'>
                    <Typography variant='h4'>Qué es ChangApp?</Typography>
                    <Typography variant="p">Changa app es una aplicación web que te ayuda a ofrecer y/o contratar servicios. 
                    Como cliente vas a encontrar los profesionales más destacados del mercado.</Typography>
                </Box>
                <Box variant="div" className='primeraPregunta'>
                    <Typography variant='h4'>Queres aumentar tus ingresos?</Typography>
                    <Typography variant='p'>Decile al mundo quién sos y que hacés y presupuestá tu trabajo.
                    Escalá en el ranking de profesionales y conectá con más clientes.</Typography>
                </Box>
                <Box variant="div" className='segundaPregunta'>
                    <Typography variant='h4'>Necesitas una solución rápida?</Typography>
                    <Typography variant='p'>Como cliente vas a encontrar los profesionales más destacados del mercado dispuestos a ayudarte en lo que necesites.</Typography>
                </Box>
            </Box>
        </Box>
        <Box variant="section" className="standout-services-welcome" sx={{padding:'20px', textAlign: 'center', backgroundColor: 'black'}}>
            <Typography variant='h4' sx={{margin:'15px 0', color: 'white', backgroundColor: 'black'}}>Algunos Servicios</Typography>
                <CardLanding />
        </Box>
        <Box variant='section' className='get-started-welcome'>
            <Typography variant='h3' className='gt-tiitle'>Comenzamos?</Typography>
            <Typography viariant='p'>Ingresa con cualquiera de estos botones y/o inicia sesion con tu cuenta nueva o ya registrada</Typography>
            <Box variant='div' className='bttns-welcome' sx={{display:'flex', gap:'100px', margin:'60px 0 0', justifyContent:'center', height:'400px'}}>
                <Link style={{ textDecoration: 'none',
    textTransform: 'none' }} to='/home' >
                <Typography className='bttns_welcome' sx={{height:'138px'}} variant='h5'>Ingreso sin cuenta</Typography>
                </Link>
                <Link style={{ textDecoration: 'none',
    textTransform: 'none'}}to='/login'>
                    <Box variant='div' className='bttns_welcome'>
                    <Typography s variant='h5'>Registrate</Typography>
                    <Typography variant='h5'>O</Typography>
                    <Typography variant='h5'>Ingresa con tu cuenta</Typography>
                    </Box>
                </Link>
            </Box>
        </Box>

    </Container>
  )
}



// const handleAnonymous = async (e) => {
//     e.preventDefault()
//     try {
//       await logAnonymous()
//       navigate('/home')
//     } catch (error) {
//       console.log('Error anonimo')
//     }
//   }
