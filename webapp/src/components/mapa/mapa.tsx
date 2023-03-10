import React, { useEffect,useRef,useState } from 'react';
import '../../hojasEstilo/mapa.css';
import { initMap } from './initMap';
  

function Mapa(): JSX.Element {
  

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const mapRef = useRef<HTMLDivElement>(null);

  if (latitude !== null && longitude !== null){
    var latitud =latitude;
    var longitud = longitude;
    
  }else{
    var longitud = -5.851543817083269;
    var latitud = 43.3548058269008;
  }
  useEffect(() => {
    if (mapRef.current) {
        initMap(
            mapRef.current,
            [longitud,latitud]
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