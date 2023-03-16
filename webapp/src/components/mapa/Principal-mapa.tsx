import React, { useRef, useEffect, useState } from 'react';
import Mapa from './mapa';
import {SessionType} from "../../accesoPods/adaptador";

function MapaPrincipal({ session }: SessionType){
  return (
    <div>
      <Mapa session={session}/>
    </div>
  );
  
}

export default MapaPrincipal