import React, { useEffect,useRef,useState } from 'react';
import '../../hojasEstilo/mapa.css';
import { initMap } from './initMap';
import {SessionType} from "../../shared/shareddtypes"
import {useParams} from 'react-router-dom';
import {Navigate } from 'react-router-dom';
  

function MapaAmigos({ session }: SessionType): JSX.Element {

  const {user} = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  
  let mapa: mapboxgl.Map;
  useEffect(() => {
    if (mapRef.current) {


        if (user){
            mapa = initMap(
            mapRef.current, {session}, user
        )
        }else{
          mapa = initMap(
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