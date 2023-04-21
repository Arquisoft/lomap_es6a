import mapboxgl ,{Map,Popup} from 'mapbox-gl';
import React from 'react';
import {recuperarMarcador,guardarMarcador, guardarComentario, recuperarComentario, guardarMarcadorSinImagen} from "../../accesoPods/adaptador";
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


export const initMap = (container: HTMLDivElement, { session }: SessionType, user: string) => {
  const mapa = new Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        zoom: 15,
        accessToken: "pk.eyJ1IjoidW8yODI4MzQiLCJhIjoiY2xlcHp5Z2syMGRteTQ5cDJ2dXltMm5uYSJ9.kTLZTl2_YvQiN79m2kPQ1g",
        doubleClickZoom: false
        
    });
    
    function crearImgHtml(foto:string){
      let chincheta = document.createElement('img');
      chincheta.src = foto;
      chincheta.width = 30; // establecer el ancho en 30 píxeles
      chincheta.height = 30; // establecer la altura en 30 píxeles

      return chincheta;
    }

    let markerFinal = new Marker("","",0,0,"");
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
      
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

      let userMarkers: Marker[]
      userMarkers = [];

      recuperarMarcador({session}.session,user).then(markers => {
        if (markers != null) {
            userMarkers = markers;
            userMarkers.forEach(market => {
                console.log(market);
                let iconMarker;
                if (market.tipo == "Bar"){
                  iconMarker = crearImgHtml(bar);
                }else if(market.tipo == "Restaurante"){
                  iconMarker = crearImgHtml(restaurante);
                }else if(market.tipo == "Gasolinera"){
                  iconMarker = crearImgHtml(gasolinera);
                }else if(market.tipo == "Tienda"){
                  iconMarker = crearImgHtml(tienda);
                }else if(market.tipo == "Paisaje"){
                  iconMarker = crearImgHtml(paisaje);
                }else if(market.tipo == "Monumento"){
                  iconMarker = crearImgHtml(monumento);
                }else{
                  iconMarker = crearImgHtml(interrogacion);
                }
                  let marker = new mapboxgl.Marker({ element: iconMarker })
                  .setLngLat([market.latitude, market.longitude])
                  .setPopup(new Popup({ closeButton: false, anchor: 'left', maxWidth: '400px' })
                  .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${market.longitude}, ${market.latitude}]</div>`))
                  .addTo(mapa);
                  markerFinal = market;                                     
                  const onMarkerClick= ()=>{
                    const handleClickPopup = (event: MouseEvent) => {
                      event.preventDefault();
                    }
                    const handleClick = (event: MouseEvent) => {
                      event.preventDefault();
                      const miInput = document.getElementById('comentario');
                      const miInputValoracion = document.getElementById('valoracion');
  
                        // Obtener el valor del input de texto
                        if (miInput instanceof HTMLInputElement && miInputValoracion instanceof HTMLInputElement){
                          let texto = miInput.value;
                          let valoracion = miInputValoracion.value
                          if (Number(valoracion) != null){
                            if (texto.length != 0 && Number(valoracion)>=0 && Number(valoracion)<=10){
                              if (session.info.isLoggedIn) {
                                const user2 = session.info.webId;
                                let nombreUsuario = "";
                                if (user2) {
                                  nombreUsuario = user2.split('//')[1].split('.')[0];
                                }
                                guardarComentario({session}.session, texto, market.id, nombreUsuario , valoracion, user);
                              }
                              miInput.value = "";
                              miInputValoracion.value = "";
                            }
                          }
                        }else{
                          console.log("No entro")
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
                    let img;
                    if (typeof market.imagen === "string"){
                       img = market.imagen;
                    }

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
                    const popupElement = marker.getPopup().setHTML(html);

                    const miboton = document.getElementById("btnenviar");
                    if (miboton instanceof HTMLButtonElement){
                      miboton.addEventListener("click",handleClick);
                    }

                    popupElement.getElement().addEventListener("click",handleClickPopup);
                  }
                    });
                  }
                  marker.getElement().addEventListener('click',onMarkerClick);
            });
        }
      });  
    return mapa;
}