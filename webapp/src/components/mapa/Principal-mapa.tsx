import React, { useRef, useEffect, useState } from 'react';
import Form from './form'
import '../../hojasEstilo/MapaPrincipal.css';
import {SessionType} from "../../shared/shareddtypes";

function MapaPrincipal({ session }: SessionType){
  return (
    <div className='contenedor-principal-mapa'>
      <Form session={session}/>
    </div>
  );
  
}

export default MapaPrincipal