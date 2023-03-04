import React from 'react';

function Footer(){
    return(
        <footer className='contenedor-footer'>
            <p className='nombre-equipo'>Equipo LoMap 6A</p>
            <img src={require('../../imagenes/logo192.png')} alt="logo react"/>
        </footer>
    );
}

export default Footer;