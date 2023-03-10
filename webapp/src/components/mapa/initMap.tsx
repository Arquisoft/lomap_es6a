import mapboxgl ,{Map,Popup} from 'mapbox-gl';

export const initMap = (container: HTMLDivElement) => {

    const mapa = new Map({
        container,
        style: 'mapbox://styles/mapbox/dark-v10',
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
        new mapboxgl.Marker().setLngLat([longitude,latitude]).setPopup(new Popup({ closeButton: false, anchor: 'left', })
        .setHTML(`<div class="popup">Mi ubicación inicial: <br/>[${longitude}, ${latitude}]</div>`)).addTo(mapa);
      });

    mapa.on('dblclick', function (evt) {
        new mapboxgl.Marker().setLngLat([evt.lngLat.lng,evt.lngLat.lat]).setPopup(new Popup({ closeButton: false, anchor: 'left', })
        .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${evt.lngLat.lat}, ${evt.lngLat.lng}]</div>`)).addTo(mapa);
      });
    return mapa;
}