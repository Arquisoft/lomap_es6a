import React, { useEffect,useRef,useState } from 'react';
import '../../hojasEstilo/form.css';
import {recuperarMarcador,guardarMarcador} from "../../accesoPods/adaptador";
import Marker from "../../accesoPods/marker";
import casa from '../../imagenes/marcador.png';
import bar from '../../imagenes/bar.png';
import restaurante from '../../imagenes/restaurante.png';
import gasolinera from '../../imagenes/gasolinera.png';
import interrogacion from '../../imagenes/interrogacion.png';
import {SessionType} from "../../shared/shareddtypes"
import { initMap } from './initMap';
import mapboxgl ,{Map,Popup} from 'mapbox-gl';

function Formulario({ session }: SessionType) {
  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let marker = guardarMarcador({session}.session, nombre,Number(latitud),Number(longitud), tipo);
    setNombre("");
    setLatitud("");
    setLongitud("");
    setTipo("");
    console.log(`Nombre: ${nombre}, Latitud: ${latitud}, Longitud: ${longitud}, Tipo: ${tipo}`);
    // Aquí podrías hacer algo con los datos del formulario, como enviarlos a un servidor
  };

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleLatitudChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitud(event.target.value);
  };

  const handleLongitudChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongitud(event.target.value);
  };

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipo(event.target.value);
  };

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
        let mapa = initMap(
            mapRef.current, {session}
        )

        mapa.on('dblclick', function (evt) {
          //let marker = guardarMarcador({session}.session,evt.lngLat.lng,evt.lngLat.lat);
          setLongitud(evt.lngLat.lat+"");
          setLatitud(evt.lngLat.lng+"");
        });
    }
  }, []);

  

  return (
    
     <>
     <form onSubmit={handleSubmit} className="formulario">
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={handleNombreChange} required />
      </label>
      <br />
      <label>
        Longitud:
        <input type="number" name="longitud" min="-180" max="180" step="0.000000000000001" value={longitud} onChange={handleLongitudChange} required />
      </label>
      <br />
      <label>
        Latitud:
        <input type="number" name="latitud" min="-90" max="90" step="0.000000000000001" value={latitud} onChange={handleLatitudChange} required />
      </label>
      <br />
      <label>
        Tipo:
        <select value={tipo} onChange={handleTipoChange} required>
          <option value="">Elija un tipo</option>
          <option value="Gasolinera">Gasolinera</option>
          <option value="Restaurante">Restaurante</option>
          <option value="Bar">Bar</option>
        </select>
      </label>
      <br />
      <button type="submit">Añadir</button>
    </form>
     <div className='contenedor-mapa'>
       <div ref={mapRef} className='map' />
     </div>
     </>
  );
}

export default Formulario;