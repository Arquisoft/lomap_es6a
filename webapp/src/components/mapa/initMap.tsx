import mapboxgl ,{Map,Popup,MapboxEvent} from 'mapbox-gl';
import React, {useState} from 'react';
import {recuperarMarcador,guardarMarcador} from "../../accesoPods/adaptador";
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

interface CustomEventData {
  comment: string;
}
export const initMap = (container: HTMLDivElement, { session }: SessionType) => {

    const mapa = new Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        zoom: 15,
        accessToken: "pk.eyJ1IjoidW8yODI4MzQiLCJhIjoiY2xlcHp5Z2syMGRteTQ5cDJ2dXltMm5uYSJ9.kTLZTl2_YvQiN79m2kPQ1g",
        doubleClickZoom: false
        
    });
    let comentario = "";
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      comentario = event.target.value;
    };
    let markerFinal = new Marker("",0,0,"","");
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

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        guardarMarcador({session}.session, markerFinal.nombre,Number(markerFinal.latitude),Number(markerFinal.longitude), markerFinal.tipo,comentario);
      };

      recuperarMarcador({session}.session).then(markers => {
        if (markers != null) {
            userMarkers = markers;
            userMarkers.forEach(market => {
                console.log(market);
                let iconMarker;
                if (market.tipo == "Bar"){
                  let barMarker = document.createElement('img');
                  barMarker.src = bar;
                  barMarker.width = 30; // establecer el ancho en 30 píxeles
                  barMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = barMarker;
                }else if(market.tipo == "Restaurante"){
                  let restauranteMarker = document.createElement('img');
                  restauranteMarker.src = restaurante;
                  restauranteMarker.width = 30; // establecer el ancho en 30 píxeles
                  restauranteMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = restauranteMarker;
                }else if(market.tipo == "Gasolinera"){
                  let gasolineraMarker = document.createElement('img');
                  gasolineraMarker.src = gasolinera;
                  gasolineraMarker.width = 30; // establecer el ancho en 30 píxeles
                  gasolineraMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = gasolineraMarker;
                }else if(market.tipo == "Tienda"){
                  let tiendaMarker = document.createElement('img');
                  tiendaMarker.src = tienda;
                  tiendaMarker.width = 30; // establecer el ancho en 30 píxeles
                  tiendaMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = tiendaMarker;
                }else if(market.tipo == "Paisaje"){
                  let paisajeMarker = document.createElement('img');
                  paisajeMarker.src = paisaje;
                  paisajeMarker.width = 30; // establecer el ancho en 30 píxeles
                  paisajeMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = paisajeMarker;
                }else if(market.tipo == "Monumento"){
                  let monumentoMarker = document.createElement('img');
                  monumentoMarker.src = monumento;
                  monumentoMarker.width = 30; // establecer el ancho en 30 píxeles
                  monumentoMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = monumentoMarker;
                }else{
                  let interrogacionMarker = document.createElement('img');
                  interrogacionMarker.src = interrogacion;
                  interrogacionMarker.width = 30; // establecer el ancho en 30 píxeles
                  interrogacionMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = interrogacionMarker;
                }
                  let marker = new mapboxgl.Marker({ element: iconMarker })
                  .setLngLat([market.latitude, market.longitude])
                  .setPopup(new Popup({ closeButton: false, anchor: 'left' })
                  .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${market.longitude}, ${market.latitude}]</div>`))
                  .addTo(mapa);
                  markerFinal = market;
                  function onMarkerClick(){
                    marker.getPopup().setHTML(`<form id="comment-form"><label for="comentario">Añadir un comentario:</label><input type="text" id="comentario" name="comentario" required> <button type="submit">Enviar</button></form>`);
                    marker.getPopup().on('submit', () => {
                      const form = document.getElementById('comment-form') as HTMLFormElement;
                      form.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const formData = new FormData(form);
                        const comment = formData.get('comentario') as string;
                        comentario = formData.get('comentario') as string;
                        const eventData: CustomEventData = { comment };
                        marker.getPopup().fire('comment', eventData);
                      });
                    });
                  }
                  marker.getElement().addEventListener('click',onMarkerClick);
            });
        }
      });  

    mapa.on('dblclick', function (evt) {
        //let marker = guardarMarcador({session}.session,evt.lngLat.lng,evt.lngLat.lat);

      });
    return mapa;
}