import React, { useRef, useEffect, useState } from 'react';
import initMap from './initMap';

function Mapa(){
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            initMap(
                mapRef.current,
                [-100.31019063199852, 25.66901932031443]
            )
        }
    }, []);

    return (
        <div ref={mapRef} className='map' />
    )
}

export default Mapa;