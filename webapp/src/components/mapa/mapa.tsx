import React, { useEffect,useRef,useState} from 'react';
import '../../hojasEstilo/mapa.css';
import {initMap} from './initMap';
import {SessionType} from "../../shared/shareddtypes"
import {useParams, Navigate} from 'react-router-dom';
import Marker from '../../accesoPods/marker';
import Filtro from './filtro';
  

function MapaAmigos({ session }: SessionType): JSX.Element {
  const [marcadores, setMarcadores] = useState(Array<mapboxgl.Marker>);const [marcadoresObjeto, setMarcadoresObjeto] = useState(Array<Marker>);
  const {user} = useParams();const mapRef = useRef<HTMLDivElement>(null);let tupla: [mapboxgl.Map,Array<mapboxgl.Marker>,Array<Marker>];
  
  let mapa: mapboxgl.Map;
  useEffect(() => {
    if (mapRef.current) {
        if (user){
          tupla = initMap(mapRef.current, {session}, user );mapa = tupla[0];setMarcadores(tupla[1]);setMarcadoresObjeto(tupla[2]);
        }else{
          tupla = initMap( mapRef.current, {session}, "");mapa = tupla[0];setMarcadores(tupla[1]);setMarcadoresObjeto(tupla[2]);
        }
    }
  }, []);
  
  if (!session.info.isLoggedIn){
    return <Navigate to="/login" replace />;
  }
  return (
  <>
    <div className='mapc'>
      <Filtro marcadores={marcadores} marcadoresObjeto={marcadoresObjeto}/>
      <div ref={mapRef} className='mapaAmigos' />
    </div>
  </>
  );
}

export default MapaAmigos;