import React, { useEffect,useRef } from 'react';
import './App.css';
import { initMap } from './utils/initMap';

function App(): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (mapRef.current) {
        initMap(
            mapRef.current,
            [-5.851543817083269,43.3548058269008]
        )
    }
}, []);

  return (
  <>
  <div className='ejemplo'>
    <h1>LOMAP_ES6A</h1>
    <div ref={mapRef} className='map' />
  </div>
  </>
  );
}

export default App;
