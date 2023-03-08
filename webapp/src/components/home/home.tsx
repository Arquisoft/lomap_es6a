import React from "react";
import Descripcion from "./descripcion";
import '../../hojasEstilo/home.css'
import foto from '../../imagenes/chicamovil.jpg'

function Home() {
    return (
      <div className="contenedor_home_principal">
          <Descripcion/>
          <img src={foto} alt='foto chica movil'/>
      </div>
    );
  }
  
  export default Home;