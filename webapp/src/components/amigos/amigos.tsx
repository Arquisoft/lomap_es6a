import React from "react";
import {Navigate } from 'react-router-dom';
import BuscarAmigo from "./buscarAmigo";
import { useSession } from '@inrupt/solid-ui-react';

function Amigos() {
  const { session } = useSession();
  if (!session.info.isLoggedIn){
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="contenedor_amigos_principal">
            <h1>Bienvenido a Amigos</h1>
            <BuscarAmigo/>
    </div>
  );
}

export default Amigos;