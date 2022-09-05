import React from 'react'
import Typography from '@mui/material/Typography'
import { Avatar, Box } from '@mui/material'

export default function NothingCard(text, ) {
  return (
    <Box component='div'>
        <Typography variant="h4" color="initial">¡Oops!... No se hay resultados</Typography>
        <Box component='div'>
        <Avatar sx={{ width: 32, height: 32 }}>
            { 
              <img src='https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' alt="?" width="32px" height="32px" />
            }
          </Avatar>
          <Box>
            {
                {text} ? (
                    <Typography>{text}</Typography>
                    ) : (
                    <Typography>Esta página no tiene contenido por el momento.</Typography>
                )
            }
          </Box>
        </Box>
    </Box>
  )
}
