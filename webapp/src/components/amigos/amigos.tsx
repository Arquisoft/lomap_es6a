import React from "react";
import {Navigate } from 'react-router-dom';
import BuscarAmigo from "./buscarAmigo";
import {SessionType} from "../../shared/shareddtypes";

function Amigos({ session }: SessionType) {
  if (!session.info.isLoggedIn) {
      return <Navigate to="/lomap_6a_despliegue/login" replace />;
  }

  return (
      <div className="contenedor_amigos_principal">
          <h1 className='titulos'>Bienvenido a Amigos</h1>
          <BuscarAmigo session={session}/>
      </div>
  );
}

export default Amigos;