import React, { useRef, useEffect, useState } from 'react';
import Mapa from './mapa';
import {SessionType} from "../../shared/shareddtypes";

function MapaPrincipal({ session }: SessionType){
  return (
    <div className='contenedor-principal-mapa'>
      <Mapa session={session}/>
    </div>
  );
  
}

export default MapaPrincipal