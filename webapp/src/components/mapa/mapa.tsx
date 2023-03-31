import React, { useEffect,useRef,useState } from 'react';
import '../../hojasEstilo/mapa.css';
import { initMap } from './initMap';
import {SessionType} from "../../shared/shareddtypes"
  

function Mapa({ session }: SessionType): JSX.Element {

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
        initMap(
            mapRef.current, {session}
        )
    }
  }, []);
  

  return (
  <>
  <div className='contenedor-mapa'>
    <div ref={mapRef} className='map' />
  </div>
  </>
  );
}

export default Mapa;