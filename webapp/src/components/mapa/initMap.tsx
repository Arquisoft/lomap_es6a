import mapboxgl ,{Map,Popup} from 'mapbox-gl';
import {recuperarMarcador,guardarMarcador} from "../../accesoPods/adaptador";
import {SessionType} from "../../shared/shareddtypes";
import casa from '../../imagenes/marcador.png';
import bar from '../../imagenes/bar.png';
import restaurante from '../../imagenes/restaurante.png';
import gasolinera from '../../imagenes/gasolinera.png';
import interrogacion from '../../imagenes/interrogacion.png';
import Marker from "../../accesoPods/marker";


export const initMap = (container: HTMLDivElement, { session }: SessionType) => {

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
                }else{
                  let interrogacionMarker = document.createElement('img');
                  interrogacionMarker.src = interrogacion;
                  interrogacionMarker.width = 30; // establecer el ancho en 30 píxeles
                  interrogacionMarker.height = 30; // establecer la altura en 30 píxeles
                  iconMarker = interrogacionMarker;
                }
                  new mapboxgl.Marker({ element: iconMarker })
                  .setLngLat([market.latitude, market.longitude])
                  .setPopup(new Popup({ closeButton: false, anchor: 'left' })
                  .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${market.longitude}, ${market.latitude}]</div>`))
                  .addTo(mapa);
            });
        }
      });  

    mapa.on('dblclick', function (evt) {
        //let marker = guardarMarcador({session}.session,evt.lngLat.lng,evt.lngLat.lat);

      });
    return mapa;
}