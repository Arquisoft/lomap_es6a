import React from 'react';
import '../../hojasEstilo/Footer.css';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    stickToBottom: {
      backgroundColor:'#000000',
      background: "linear-gradient(45deg, #000000 30%, #FFFFFF 70%)",
      marginTop: '1rem',
      padding: '1rem',
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      textAlign:'center'
    },
});
function Footer(){
    return(
        <footer className='contenedor-footer'>
            <Typography variant='h5' align='center'>
                LoMap-es6a
            </Typography>
        </footer>
    );
}

export default Footer;