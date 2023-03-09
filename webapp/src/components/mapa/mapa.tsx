import React, { useEffect,useRef } from 'react';
import '../../hojasEstilo/mapa.css';
import { initMap } from './initMap';


function Mapa(): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (mapRef.current) {
        initMap(
            mapRef.current,
            [-5.851543817083269,43.3548058269008]
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