import { Map } from 'mapbox-gl';

const initMap = (container: HTMLDivElement, coords: [number, number]) => {
    return new Map({
        container,
        style: 'mapbox://styles/mapbox/dark-v10',
        pitchWithRotate: false,
        center: coords,
        zoom: 15,
        accessToken: 'pk.eyJ1IjoidW8yODI5NDQiLCJhIjoiY2xiM3d4MnNwMDJoMDNuczVxbXkzd2R1NyJ9.CoUhyImTRE_3w_zsY0p5Ug',
        doubleClickZoom: false
    });
}

export default initMap;