import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

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
        <div>
            <Box style={styles.container} className="navBar">
                <Link to='/'><Typography variant="h4">ChangApp</Typography></Link>
            </Box>
        </div>)
}