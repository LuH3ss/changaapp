import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const styles = {
    container:{
      padding: '10px 0', 
      backgroundColor: '#1F2937',
      color: 'white',
      
    },
    button: {
      color: 'white'
    }
  }

export default function Nav() {
    return(
        <div style={{width:'100%'}}>
            <Box style={styles.container} className="navBar">
                <Typography variant="h4">ChangApp</Typography>
            </Box>
        </div>)
}