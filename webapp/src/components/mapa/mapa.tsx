import React, { useEffect,useRef} from 'react';
import '../../hojasEstilo/mapa.css';
import { initMap } from './initMap';
import {SessionType} from "../../shared/shareddtypes"
import {useParams, Navigate} from 'react-router-dom';
  

function MapaAmigos({ session }: SessionType): JSX.Element {

  const {user} = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  
  let mapa: mapboxgl.Map;
  useEffect(() => {
    if (mapRef.current) {


        if (user){
            initMap(
            mapRef.current, {session}, user
        )
        }else{
          initMap(
            mapRef.current, {session}, "")
        }

    }
  }, []);
  
  if (!session.info.isLoggedIn){
    return <Navigate to="/login" replace />;
  }
  return (
  <>
  <div className='contenedor-mapa'>
    <div ref={mapRef} className='map' />
  </div>
  </>
  );
}

export default MapaAmigos;