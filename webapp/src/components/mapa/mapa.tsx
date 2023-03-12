import React, { useEffect,useRef,useState } from 'react';
import '../../hojasEstilo/mapa.css';
import { initMap } from './initMap';
  

function Mapa(): JSX.Element {

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
        initMap(mapRef.current)
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