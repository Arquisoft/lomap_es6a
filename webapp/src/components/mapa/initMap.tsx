import mapboxgl ,{Map,Popup} from 'mapbox-gl';
import {recuperarMarcador, guardarComentario, recuperarComentario} from "../../accesoPods/adaptador";
import {SessionType} from "../../shared/shareddtypes";
import casa from '../../imagenes/marcador.png';
import bar from '../../imagenes/bar.png';
import restaurante from '../../imagenes/restaurante.png';
import gasolinera from '../../imagenes/gasolinera.png';
import tienda from '../../imagenes/tienda.png';
import paisaje from '../../imagenes/paisaje.png';
import monumento from '../../imagenes/monumento.png';
import interrogacion from '../../imagenes/interrogacion.png';
import Marker from "../../accesoPods/marker";
import Comentario from '../../accesoPods/comentario';
import { Session } from '@inrupt/solid-client-authn-browser';


export const crearImgHtml =  (foto:string) =>{
  let chincheta = document.createElement('img');
  chincheta.src = foto;
  chincheta.width = 30; // establecer el ancho en 30 píxeles
  chincheta.height = 30; // establecer la altura en 30 píxeles

  return chincheta;
}

export const seleccionarIcono =(tipo:string) =>{
  if (tipo == "Bar"){
    return crearImgHtml(bar);
  }else if(tipo == "Restaurante"){
    return crearImgHtml(restaurante);
  }else if(tipo == "Gasolinera"){
    return crearImgHtml(gasolinera);
  }else if(tipo == "Tienda"){
    return crearImgHtml(tienda);
  }else if(tipo == "Paisaje"){
    return crearImgHtml(paisaje);
  }else if(tipo == "Monumento"){
    return crearImgHtml(monumento);
  }else{
    return crearImgHtml(interrogacion);
  }
}


export function validacionCamposComentario(texto:string, valoracion:string){
  return (texto.length != 0 && Number(valoracion)>=0 && Number(valoracion)<=10 && Number(valoracion) != null && valoracion.length != 0);
}

export function guardarComentarioSiEstaEnSesion(texto:string,marker:Marker,valoracion:string,session:Session,user: string){
  if (session.info.isLoggedIn) {
    const user2 = session.info.webId;
    let nombreUsuario = "";
    if (user2) {
      nombreUsuario = user2.split('//')[1].split('.')[0];
    }
    guardarComentario({session}.session, texto, marker.id, nombreUsuario , valoracion, user);
  }
}

export function cargarMarcadores(markers:Marker[],mapa:mapboxgl.Map
  ,marcadoresEnMapa:mapboxgl.Marker[],marcadoresObjetoEnMapa:Marker[],popupElement:mapboxgl.Popup,session:Session,user:string){
  let userMarkers: Marker[]
  userMarkers = markers;
  userMarkers.forEach(market => {
      console.log(market);
      let iconMarker;
      iconMarker = seleccionarIcono(market.tipo);
        let marker = new mapboxgl.Marker({ element: iconMarker })
        .setLngLat([market.latitude, market.longitude])
        .setPopup(new Popup({ closeButton: false, anchor: 'left', maxWidth: '400px' })
        .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${market.longitude}, ${market.latitude}]</div>`))
        .addTo(mapa);
        marcadoresEnMapa.push(marker);
        marcadoresObjetoEnMapa.push(market);                               
        const onMarkerClick= ()=>{
          const handleClickPopup = (event: MouseEvent) => {
            event.preventDefault();
          }
          const handleClick = (event: MouseEvent) => {
            event.preventDefault();
            const miInput = document.getElementById('comentario');
            const miInputValoracion = document.getElementById('valoracion');

              // Obtener el valor del input de texto
              let texto = (miInput as HTMLInputElement).value;
              let valoracion = (miInputValoracion  as HTMLInputElement).value
              if (validacionCamposComentario(texto,valoracion)){
                
                guardarComentarioSiEstaEnSesion(texto, market, valoracion,session,user);

                (miInput as HTMLInputElement).value = "";
                (miInputValoracion  as HTMLInputElement).value = "";
                popupElement.remove();
              }
              
            
          };

          let markerComments: Comentario[]
          markerComments = [];
          let cadena = "<div class='table-container'><table class='table'><tr><th>Usuario</th><th>Comentario</th><th>Valoración</th></tr>";
          recuperarComentario({session}.session, market.id, user).then(comentarios => {
            
            if (comentarios != null) {
              markerComments = comentarios;
              markerComments.forEach(comentario => {
                
                cadena += "<tr><td>"+ comentario.autor +"</td><td>"+ comentario.texto+"</td><td>" + comentario.valoracion +"</td></tr>"
              }
          )
          cadena += "</table></div>"+
          "<style>.table-container { max-height: 200px; overflow-y: auto; } .table { width: 100%; border-collapse: collapse; } .table th, .table td { border: 1px solid #ccc; padding: 10px; text-align: left; } .table th { background-color: #f2f2f2; font-weight: bold; } .table tr:nth-child(even) { background-color: #f9f9f9; } .table tr:hover { background-color: #e6e6e6; } .table td.actions { text-align: center; } .table td.actions a { color: #007bff; text-decoration: none; } .table td.actions a:hover { color: #0056b3; } th { font-weight: bold; } </style>";
          let img = market.imagen;

          let html = `<img style="width: 250px; height: 150px;"src =`+img +`>`+`
          <h1>`+ market.nombre+`</h1>
          <p>`+ market.descripcion+`</p>
          <form id="comment-form">
            <input type="text" id="comentario" name="comentario" placeholder="Escribe un comentario" required>
            <input type="number" id="valoracion" min="0" max="10" step="1" placeholder="Valora del 1 al 10" required>
            <button type="submit" id="btnenviar" >Enviar</button>
          </form>
          <h2>Comentarios</h2>
          `+ cadena;
          popupElement = marker.getPopup().setHTML(html);

          const miboton = document.getElementById("btnenviar");
          
          (miboton as HTMLButtonElement).addEventListener("click",handleClick);

          popupElement.getElement().addEventListener("click",handleClickPopup);
        }
          }).catch(error=>{throw new Error(error)});
        }
        marker.getElement().addEventListener('click',onMarkerClick);
  });
}

export const initMap = (container: HTMLDivElement, { session }: SessionType, user: string) => {
  const marcadoresEnMapa: Array<mapboxgl.Marker> = [];
  const marcadoresObjetoEnMapa: Array<Marker> = [];
  let popupElement:Popup;
  const mapa = new Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        zoom: 15,
        accessToken: "pk.eyJ1IjoidW8yODI4MzQiLCJhIjoiY2xlcHp5Z2syMGRteTQ5cDJ2dXltMm5uYSJ9.kTLZTl2_YvQiN79m2kPQ1g",
        doubleClickZoom: false
        
    });

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
       // position.coords.
        // Centra el mapa en la ubicación del usuario
        mapa.setCenter([longitude, latitude]);
      
        // Añade un marcador en la ubicación del usuario
        const markerElement = document.createElement('img');
        markerElement.src = casa;
        markerElement.width = 30; // establecer el ancho en 30 píxeles
        markerElement.height = 30; // establecer la altura en 30 píxeles


        new mapboxgl.Marker({ element: markerElement })
          .setLngLat([longitude, latitude])
          .setPopup(new Popup({ closeButton: false, anchor: 'left' })
          .setHTML(`<div class="popup">Mi ubicación inicial: <br/>[${longitude}, ${latitude}]</div>`))
          .addTo(mapa);

      });

      recuperarMarcador({session}.session,user).then(markers => {
        if (markers != null) {
            cargarMarcadores(markers,mapa,marcadoresEnMapa,marcadoresObjetoEnMapa,popupElement,session,user)
        }
      }).catch(error=>{throw new Error(error)});

      let tupla: [mapboxgl.Map,Array<mapboxgl.Marker>,Array<Marker>];
      tupla =[mapa,marcadoresEnMapa,marcadoresObjetoEnMapa];  
    return tupla;
}