import mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';

export const initMap = (container: HTMLDivElement, coords: [number, number]) => {

    const mapa = new Map({
        container,
        style: 'mapbox://styles/mapbox/dark-v10',
        pitchWithRotate: false,
        center: coords,
        zoom: 15,
        accessToken: "pk.eyJ1IjoidW8yODI4MzQiLCJhIjoiY2xlcHp5Z2syMGRteTQ5cDJ2dXltMm5uYSJ9.kTLZTl2_YvQiN79m2kPQ1g",
        doubleClickZoom: false
        
    });
     new mapboxgl.Marker()
    .setLngLat([-5.851543817083269,43.3548058269008])
    .addTo(mapa);
    return mapa;
}