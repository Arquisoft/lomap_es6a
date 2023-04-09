import React from "react";
import BuscarAmigo from "./buscarAmigo";
import { useSession } from '@inrupt/solid-ui-react';

function Amigos() {
  const { session } = useSession();
  return (
    <div className="contenedor_amigos_principal">
            <h1>Bienvenido a Amigos</h1>
            <BuscarAmigo/>
    </div>
  );
}

export default Amigos;