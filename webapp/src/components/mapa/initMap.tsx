import mapboxgl ,{Map,Popup} from 'mapbox-gl';
import {recuperarMarcador,guardarMarcador} from "../../accesoPods/adaptador";
import {SessionType} from "../../shared/shareddtypes"
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
        new mapboxgl.Marker({
          color: "#FF0000"
        }).setLngLat([longitude,latitude]).setPopup(new Popup({ closeButton: false, anchor: 'left', })
        .setHTML(`<div class="popup">Mi ubicación inicial: <br/>[${longitude}, ${latitude}]</div>`)).addTo(mapa);

      });

      let userMarkers: Marker[]
      userMarkers = [];

      recuperarMarcador({session}.session).then(markers => {
        if (markers != null) {
            userMarkers = markers;
            userMarkers.forEach(market => {
                console.log(market);
                // NUEVO
                new mapboxgl.Marker().setLngLat([market.latitude,market.longitude]).setPopup(new Popup({ closeButton: false, anchor: 'left', })
                  .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${market.latitude}, ${market.longitude}]</div>`)).addTo(mapa);
            });
        }
      });  

    mapa.on('dblclick', function (evt) {
        let marker = guardarMarcador({session}.session,evt.lngLat.lng,evt.lngLat.lat);

        new mapboxgl.Marker().setLngLat([evt.lngLat.lng,evt.lngLat.lat]).setPopup(new Popup({ closeButton: false, anchor: 'left', })
        .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${evt.lngLat.lat}, ${evt.lngLat.lng}]</div>`)).addTo(mapa);
      });
    return mapa;
}