import React from "react";
import Descripcion from "./descripcion";
import '../../hojasEstilo/home.css';
import foto1 from '../../imagenes/fotohome1.png';
import foto11 from '../../imagenes/fotohome11.png';
import foto12 from '../../imagenes/fotohome12.png';
import foto14 from '../../imagenes/fotohome14.png';
import foto5 from '../../imagenes/fotohome5.png';
import Slider from "./imgdinamicas";

const images: string[] = [
  foto14,
  foto12,
  foto11,
  foto1,
  foto5
];

function Home() {
    return (
        <Slider images={images} delay={10000} />
    );
  }
  
  export default Home;