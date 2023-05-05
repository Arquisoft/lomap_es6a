import { useState } from "react";
import Marker from "../../accesoPods/marker";
import mapboxgl from "mapbox-gl";

interface FiltroProps {
  marcadores: Array<mapboxgl.Marker>;
  marcadoresObjeto: Array<Marker>;
}

function Filtro({ marcadores, marcadoresObjeto }: FiltroProps){
  const marcadoresEnMapa:Array<mapboxgl.Marker> = marcadores;
  const marcadoresObjetoEnMapa = marcadoresObjeto;

    //######################################Eventos Filtros###########################################
    let valorContadorIncial;
    valorContadorIncial = 6;
    let valor;
    valor = true;
    const [contador,setConstador] = useState(valorContadorIncial);
    const [isCheckedBar, setIsCheckedBar] = useState(valor);
    const [isCheckedPaisaje, setIsCheckedPaisaje] = useState(valor);
    const [isCheckedGasolinera, setIsCheckedGasolinera] = useState(valor);
    const [isCheckedTienda, setIsCheckedTienda] = useState(valor);
    const [isCheckedMonumento, setIsCheckedMonumento] = useState(valor);
    const [isCheckedRestaurante, setIsCheckedRestaurante] = useState(valor);
    const [isCheckedTodos, setIsCheckedTodos] = useState(valor);
  
  function handleCheckboxTodos(){
    setIsCheckedTodos(!isCheckedTodos);
    
    if (!isCheckedTodos){
      marcadoresEnMapa.forEach(marcador => {
        marcador.getElement().style.display= 'block';
      });
      let cambioContador;
      cambioContador = 6;
      let cambio;
      cambio = true;
      setConstador(cambioContador);
      setIsCheckedBar(cambio);
      setIsCheckedPaisaje(cambio);
      setIsCheckedGasolinera(cambio);
      setIsCheckedTienda(cambio);
      setIsCheckedMonumento(cambio);
      setIsCheckedRestaurante(cambio);
    }else{
      marcadoresEnMapa.forEach(marcador => {
        marcador.getElement().style.display= 'none';
      });
      let cambioContador;
      cambioContador = 0;
      let cambio;
      cambio = false;
      setConstador(cambioContador);
      setIsCheckedBar(cambio);
      setIsCheckedPaisaje(cambio);
      setIsCheckedGasolinera(cambio);
      setIsCheckedTienda(cambio);
      setIsCheckedMonumento(cambio);
      setIsCheckedRestaurante(cambio);
    }
  }

  function handleCheckboxChange(tipo:string, checked:boolean, func:React.Dispatch<React.SetStateAction<boolean>>,
    event: React.ChangeEvent<HTMLInputElement>): void{
      let c = contador;
      func(!checked);
      let i: number = 0;
      setIsCheckedTodos(false);
      //Si esta desactivado
      if (checked){
        let nuevoValor;
        nuevoValor = contador-1;
        setConstador(nuevoValor);
        c--;
        marcadoresEnMapa.forEach(marcador => {
          if (marcadoresObjetoEnMapa[i].tipo === tipo){
            marcador.getElement().style.display= 'none';
          }
          i++;
        });
      //Si esta activado
      }else{
        setConstador(contador+1);
        c++;
        marcadoresEnMapa.forEach(marcador => {
          if (marcadoresObjetoEnMapa[i].tipo === tipo){
            marcador.getElement().style.display= 'block';
          }
          i++;
        });
      }

      c===6?setIsCheckedTodos(true):setIsCheckedTodos(false);
  }
  

  return (
  <>
  <div className='filtro'>
    <span className='prueba_contador_filtro' style={{ display: 'none' }}>{contador}</span>
    <div className='pareja'>
      
      <label htmlFor='Todos'>Todos  </label>
        <input id='Todos' className="checks"
          type="checkbox"
          checked={isCheckedTodos}
          onChange={() => handleCheckboxTodos()}
        />
    </div>
    <div className='pareja'>
      <label htmlFor='Bar'>Bar  </label>
        <input id='Bar'
          type="checkbox"
          checked={isCheckedBar}
          onChange={(event) => handleCheckboxChange("Bar",isCheckedBar,setIsCheckedBar,event)}
        />
    </div>
    <div className='pareja'>
      <label htmlFor='Tienda'>Tienda  </label>
        <input id='Tienda'
          type="checkbox"
          checked={isCheckedTienda}
          onChange={(event) => handleCheckboxChange("Tienda",isCheckedTienda,setIsCheckedTienda,event)}
        />
    </div>
    <div className='pareja'>
      <label htmlFor='Gasolinera'>Gasolinera </label>
        <input id='Gasolinera'
          type="checkbox"
          checked={isCheckedGasolinera}
          onChange={(event) => handleCheckboxChange("Gasolinera",isCheckedGasolinera,setIsCheckedGasolinera,event)}
        />
    </div>
      
    <div className='pareja'>
      <label htmlFor='Paisaje'>Paisaje</label>
        <input id='Paisaje'
          type="checkbox"
          checked={isCheckedPaisaje}
          onChange={(event) => handleCheckboxChange("Paisaje",isCheckedPaisaje,setIsCheckedPaisaje,event)}
        />
    </div>
    <div className='pareja'>
      <label htmlFor='Monumento'>Monumento</label>
        <input id='Monumento'
          type="checkbox"
          checked={isCheckedMonumento}
          onChange={(event) => handleCheckboxChange("Monumento",isCheckedMonumento,setIsCheckedMonumento,event)}
        />
    </div>
    <div className='pareja'>
      <label htmlFor='Restaurante'>Restaurante</label>
        <input id='Restaurante'
          type="checkbox"
          checked={isCheckedRestaurante}
          onChange={(event) => handleCheckboxChange("Restaurante",isCheckedRestaurante,setIsCheckedRestaurante,event)}
        />
    </div>
  </div>
  </>
  );
}

export default Filtro;