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
import { Session } from "@inrupt/solid-client-authn-browser";
import { initMap } from './initMap';
import mapboxgl ,{Popup} from 'mapbox-gl';
import Filtro from './filtro';
import Marker from "../../accesoPods/marker";

interface ErroresFormulario {
  nombre: string | null;
  descripcion: string | null;
  longitud: string | null;
  latitud: string | null;
  tipo: string | null;
}

interface Props {
  session: Session;
  modo: boolean;
}

function Formulario({ session, modo }: Props) {
  const [count, setCount] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagen, setImagen] = useState("");

  const [errores, setErrores] = useState<ErroresFormulario>({
    nombre: null,
    descripcion: null,
    longitud: null,
    latitud: null,
    tipo: null,
  });

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
  let tupla: [mapboxgl.Map,Array<mapboxgl.Marker>,Array<Marker>];
  const [marcadores, setMarcadores] = useState(Array<mapboxgl.Marker>);
  const [marcadoresObjeto, setMarcadoresObjeto] = useState(Array<Marker>);
  let mapa: mapboxgl.Map;

  let nombreUsuario = "";
  if (session.info.isLoggedIn) {
    const user = session.info.webId;
    
    if (user) {
      nombreUsuario = user.split('//')[1].split('.')[0];
    }
  }
  useEffect(() => {
    if(modo) {
      if (mapRef.current) {
        tupla = initMap(mapRef.current, {session}, nombreUsuario);mapa = tupla[0];setMarcadores(tupla[1]);setMarcadoresObjeto(tupla[2]);
        mapa.on('dblclick', function (evt) {setLongitud(evt.lngLat.lat+"");setLatitud(evt.lngLat.lng+"");});
      }
    }
  }, [count]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const erroresFormulario: ErroresFormulario = {
      nombre: null,
      descripcion: null,
      longitud: null,
      latitud: null,
      tipo: null,
    };
    if (!nombre) {
      erroresFormulario.nombre = "El campo Nombre es obligatorio";
    }

    if (nombre.trim().length > 20) {
      erroresFormulario.nombre = "Nombre no debe ser superior a 20";
    }

    if (!descripcion) {
      erroresFormulario.descripcion = "El campo Descripción es obligatorio";
    }

    if (descripcion.trim().length > 100) {
      erroresFormulario.descripcion = "Descripción no debe ser superior a 100";
    }
    if (Number(longitud) < -180 || Number(longitud) > 180 || longitud.trim().length == 0) {
      erroresFormulario.longitud =
        "Longitud debe estar entre -180 y 180";
    }
    if (longitud.trim().length == 0) {
      erroresFormulario.longitud =
        "Longitud es obligatoria";
    }
    if (Number(latitud) < -90 || Number(latitud) > 90) {
      erroresFormulario.latitud =
        "Latitud debe estar entre -90 y 90";
    }

    if (latitud.trim().length == 0) {
      erroresFormulario.latitud =
        "Latitud es obligatoria";
    }

    if (!tipo || tipo =="Elija un tipo" || tipo.trim() !in ["Bar","Restaurante","Gasolinera","Tienda","Paisaje","Monumento"]) {
      erroresFormulario.tipo = "Debe elegir un Tipo de marcador";
    }
    if (Object.values(erroresFormulario).some((value) => value !== null)) {
      setErrores(erroresFormulario);
    } else {
      setErrores({
        nombre: null,
        descripcion: null,
        longitud: null,
        latitud: null,
        tipo: null,
      });
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
      if(modo){
        new mapboxgl.Marker({ element: iconMarker })
        .setLngLat([Number(latitud), Number(longitud)])
        .setPopup(new Popup({ closeButton: false, anchor: 'left' })
        .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${latitud}, ${longitud}]</div>`))
        .addTo(mapa);
      }


      console.log(`Nombre: ${nombre}, Latitud: ${latitud}, Longitud: ${longitud}, Tipo: ${tipo}`);
      // Aquí podrías hacer algo con los datos del formulario, como enviarlos a un servidor
      setCount(count+1);
    }
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
    <div className='mapc'>
      <div ref={mapRef} className='map' />
        
      <div className='panel'>
        <form onSubmit={handleSubmit} className="formulario">
          <h2>Añadir Marcador</h2>
          <label>
            Nombre:
            <input aria-label='form-nombre'
              type="text"
              value={nombre}
              placeholder='Escribe el nombre del lugar'
              onChange={handleNombreChange}
              
            />
            {errores.nombre && <div className="error">{errores.nombre}</div>}
          </label>
          <br />
          <label>
            Descripcion:
            <textarea aria-label='form-descripcion'
              style={{ resize: "none" }}
              value={descripcion}
              placeholder='Escribe la descripción del lugar'
              onChange={handleDescripcionChange}
            ></textarea>
            {errores.descripcion && (
              <div className="error">{errores.descripcion}</div>
            )}
          </label>
          <br />
          <label>
            Longitud:
            <input aria-label='form-longitud'
              type="number"
              name="longitud"
              step="0.000000000000001"
              value={longitud}
              placeholder='Doble click en el mapa'
              onChange={handleLongitudChange}
            />
            {errores.longitud && <div className="error">{errores.longitud}</div>}
          </label>
          <br />
          <label>
            Latitud:
            <input aria-label='form-latitud'
              type="number"
              name="latitud"
              step="0.000000000000001"
              value={latitud}
              placeholder='Doble click en el mapa'
              onChange={handleLatitudChange}
            />
            {errores.latitud && <div className="error">{errores.latitud}</div>}
          </label>
          <br />
          <label>
            Tipo:
            <select value={tipo} onChange={handleTipoChange} aria-label='form-tipo'>
              <option value="">Elija un tipo</option>
              <option aria-label='tipo-Gasolinera' value="Gasolinera">Gasolinera</option>
              <option aria-label='tipo-Restaurante' value="Restaurante">Restaurante</option>
              <option aria-label='tipo-Bar' value="Bar">Bar</option>
              <option aria-label='tipo-Tienda' value="Tienda">Tienda</option>
              <option aria-label='tipo-Paisaje' value="Paisaje">Paisaje</option>
              <option aria-label='tipo-Monumento' value="Monumento">Monumento</option>
            </select>
            {errores.tipo && <div className="error">{errores.tipo}</div>}
          </label>
          <label>
            Añade una imagen
            <input id="imageUploader" type="file" accept="image/*" onChange={handleImageChange} aria-label='form-imagen'/>
          </label>
          <br />
          <button type="submit">Añadir</button>
        </form>

        <Filtro marcadores={marcadores} marcadoresObjeto={marcadoresObjeto}/>
      </div>
    </div>
    </>
  );
}

export default Formulario;