import React, { useEffect,useRef,useState } from 'react';
import '../../hojasEstilo/form.css';
import {guardarMarcador, guardarMarcadorSinImagen} from "../../accesoPods/adaptador";
import bar from '../../imagenes/bar.png';
import restaurante from '../../imagenes/restaurante.png';
import gasolinera from '../../imagenes/gasolinera.png';
import interrogacion from '../../imagenes/interrogacion.png';
import tienda from '../../imagenes/tienda.png';
import paisaje from '../../imagenes/paisaje.png';
import monumento from '../../imagenes/monumento.png';
import {SessionType} from "../../shared/shareddtypes"
import { initMap } from './initMap';
import mapboxgl ,{Popup} from 'mapbox-gl';

function Formulario({ session }: SessionType) {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagen, setImagen] = useState("");

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

  const tiendaMarker = document.createElement('img');
  tiendaMarker.src = tienda;
  tiendaMarker.width = 30; // establecer el ancho en 30 píxeles
  tiendaMarker.height = 30; // establecer la altura en 30 píxeles

  const paisajeMarker = document.createElement('img');
  paisajeMarker.src = paisaje;
  paisajeMarker.width = 30; // establecer el ancho en 30 píxeles
  paisajeMarker.height = 30; // establecer la altura en 30 píxeles

  const monumentoMarker = document.createElement('img');
  monumentoMarker.src = monumento;
  monumentoMarker.width = 30; // establecer el ancho en 30 píxeles
  monumentoMarker.height = 30; // establecer la altura en 30 píxeles
  
  const mapRef = useRef<HTMLDivElement>(null);
  let mapa: mapboxgl.Map;

  let nombreUsuario = "";
  if (session.info.isLoggedIn) {
    const user = session.info.webId;
    
    if (user) {
      nombreUsuario = user.split('//')[1].split('.')[0];
    }
  }
  useEffect(() => {
    if (mapRef.current) {
          mapa = initMap(
          mapRef.current, {session}, nombreUsuario
        )

        mapa.on('dblclick', function (evt) {
          setLongitud(evt.lngLat.lat+"");
          setLatitud(evt.lngLat.lng+"");
        });

    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imagen.length > 0){
      guardarMarcador({session}.session, nombre, descripcion, Number(latitud),Number(longitud), tipo,imagen);
    }else{
      guardarMarcadorSinImagen({session}.session, nombre, descripcion, Number(latitud),Number(longitud), tipo);
    }
    setNombre("");
    setLatitud("");
    setLongitud("");
    setTipo("");
    setDescripcion("");
    
    //Añadir marcador
    let iconMarker;
    if (tipo == "Bar"){
      iconMarker = barMarker;
    }else if(tipo == "Restaurante"){
      iconMarker = restauranteMarker;
    }else if(tipo == "Gasolinera"){
      iconMarker = gasolineraMarker;
    }else if(tipo == "Tienda"){
      iconMarker = tiendaMarker;
    }else if(tipo == "Paisaje"){
      iconMarker = paisajeMarker;
    }else if(tipo == "Monumento"){
      iconMarker = monumentoMarker;
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
  const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
      let base64 = reader.result;
      if (typeof base64 === "string"){
        setImagen(base64);
      }
    }
  }
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
        Descripcion:
        <textarea style={{resize:"none"}} value={descripcion} onChange={handleDescripcionChange} required ></textarea>
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
          <option value="Tienda">Tienda</option>
          <option value="Paisaje">Paisaje</option>
          <option value="Monumento">Monumento</option>
        </select>
      </label>
      <label>
        Añade una imagen
      <input id="imageUploader" type="file" accept="image/*" onChange={handleImageChange}/>
      </label>
      <br />
      <button type="submit">Añadir</button>
    </form>
     <main className='contenedor-mapa'>
       <div ref={mapRef} className='map' />
     </main>
     </>
  );
}

export default Formulario;