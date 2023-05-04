import React, { useEffect,useRef,useState} from 'react';
import '../../hojasEstilo/mapa.css';
import {initMap} from './initMap';
import {SessionType} from "../../shared/shareddtypes"
import {useParams, Navigate} from 'react-router-dom';
import Marker from '../../accesoPods/marker';
import Filtro from './filtro';
  

function MapaAmigos({ session }: SessionType): JSX.Element {
  const [marcadores, setMarcadores] = useState(Array<mapboxgl.Marker>);const [marcadoresObjeto, setMarcadoresObjeto] = useState(Array<Marker>);
  const {user} = useParams();const mapRef = useRef<HTMLDivElement>(null);
  
  
  useEffect(() => {
    if (mapRef.current) {
        let tupla: [mapboxgl.Map,Array<mapboxgl.Marker>,Array<Marker>];
        if (user){
          tupla = initMap(mapRef.current, {session}, user );setMarcadores(tupla[1]);setMarcadoresObjeto(tupla[2]);
        }else{
          tupla = initMap( mapRef.current, {session}, "");setMarcadores(tupla[1]);setMarcadoresObjeto(tupla[2]);
        }
    }
    // eslint-disable-next-line
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