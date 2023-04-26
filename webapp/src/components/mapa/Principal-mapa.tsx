import { useState } from 'react';
import {Navigate } from 'react-router-dom';
import Form from './form'
import '../../hojasEstilo/MapaPrincipal.css';
import {SessionType} from "../../shared/shareddtypes";

function MapaPrincipal({ session }: SessionType){
  if (!session.info.isLoggedIn){
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className='contenedor-principal-mapa'>
      <Form session={session}/>
      
    </div>
  );
  
}

export default MapaPrincipal