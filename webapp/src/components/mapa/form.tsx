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

  const barMarker = document.createElement('img');
  barMarker.src = bar;
  barMarker.width = 30; // establecer el ancho en 30 píxeles
  barMarker.height = 30; // establecer la altura en 30 píxeles

  const restauranteMarker = document.createElement('img');
  restauranteMarker.src = restaurante;
  restauranteMarker.width = 30; // establecer el ancho en 30 píxeles
  restauranteMarker.height = 30; // establecer la altura en 30 píxeles

  const gasolineraMarker = document.createElement('img');
  gasolineraMarker.src = gasolinera;
  gasolineraMarker.width = 30; // establecer el ancho en 30 píxeles
  gasolineraMarker.height = 30; // establecer la altura en 30 píxeles

  const interrogacionMarker = document.createElement('img');
  interrogacionMarker.src = interrogacion;
  interrogacionMarker.width = 30; // establecer el ancho en 30 píxeles
  interrogacionMarker.height = 30; // establecer la altura en 30 píxeles
  
  const mapRef = useRef<HTMLDivElement>(null);
  let mapa: mapboxgl.Map;
  useEffect(() => {
    if (mapRef.current) {
            mapa = initMap(
            mapRef.current, {session}
        )

        mapa.on('dblclick', function (evt) {
          //let marker = guardarMarcador({session}.session,evt.lngLat.lng,evt.lngLat.lat);
          setLongitud(evt.lngLat.lat+"");
          setLatitud(evt.lngLat.lng+"");
        });

    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let marker = guardarMarcador({session}.session, nombre,Number(latitud),Number(longitud), tipo);
    setNombre("");
    setLatitud("");
    setLongitud("");
    setTipo("");
    
    //Añadir marcador
    let iconMarker;
    if (tipo == "Bar"){
      iconMarker = barMarker;
    }else if(tipo == "Restaurante"){
      iconMarker = restauranteMarker;
    }else if(tipo == "Gasolinera"){
      iconMarker = gasolineraMarker;
    }else{
      iconMarker = interrogacionMarker;
    }
      new mapboxgl.Marker({ element: iconMarker })
      .setLngLat([Number(latitud), Number(longitud)])
      .setPopup(new Popup({ closeButton: false, anchor: 'left' })
      .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${latitud}, ${longitud}]</div>`))
      .addTo(mapa);


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