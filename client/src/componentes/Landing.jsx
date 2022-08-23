import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import './css/landing.css'

export default function Landing() {
  return (
    <Container maxWidth="xl" >
        <Box className="landing-welcome" variant="section">
            <Typography variant='h3'>Bienvenido/a a</Typography>
            <Typography variant='h1'>CHANGAPP</Typography>
            <Button variant='outlined'>Conocenos</Button>
        </Box>
        <Box variant="section">
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

    </Container>
  )
}
