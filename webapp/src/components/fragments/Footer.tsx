import React from 'react';
import '../../hojasEstilo/Footer.css';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

function Footer() {
    return(
        <footer className='contenedor-footer'>
            <Typography variant='h5' align='center'>
                LoMap-es6a
            </Typography>
        </footer>
    );
}

export default Footer;