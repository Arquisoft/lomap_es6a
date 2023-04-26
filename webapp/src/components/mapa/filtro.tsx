import { useState } from "react";
import Marker from "../../accesoPods/marker";

function Filtro(props: any){

  const { marcadoresEnMapa, marcadoresObjetoEnMapa } = props;

    //######################################Eventos Filtros###########################################

    const [contador,setConstador] = useState(6);
    const [isCheckedBar, setIsCheckedBar] = useState(true);
    const [isCheckedPaisaje, setIsCheckedPaisaje] = useState(true);
    const [isCheckedGasolinera, setIsCheckedGasolinera] = useState(true);
    const [isCheckedTienda, setIsCheckedTienda] = useState(true);
    const [isCheckedMonumento, setIsCheckedMonumento] = useState(true);
    const [isCheckedRestaurante, setIsCheckedRestaurante] = useState(true);
    const [isCheckedTodos, setIsCheckedTodos] = useState(true);
  
  function handleCheckboxTodos(){
    if (marcadoresEnMapa instanceof Array<mapboxgl.Marker> && marcadoresObjetoEnMapa instanceof Array<Array<Marker>>){
      setIsCheckedTodos(!isCheckedTodos);
      
      if (!isCheckedTodos){
        marcadoresEnMapa.forEach(marcador => {
          marcador.getElement().style.display= 'block';
        });
        setConstador(6);
        setIsCheckedBar(true);
        setIsCheckedPaisaje(true);
        setIsCheckedGasolinera(true);
        setIsCheckedTienda(true);
        setIsCheckedMonumento(true);
        setIsCheckedRestaurante(true);
      }else{
        marcadoresEnMapa.forEach(marcador => {
          marcador.getElement().style.display= 'none';
        });
        setConstador(0);
        setIsCheckedBar(false);
        setIsCheckedPaisaje(false);
        setIsCheckedGasolinera(false);
        setIsCheckedTienda(false);
        setIsCheckedMonumento(false);
        setIsCheckedRestaurante(false);
      }
    }
    return;
  }

  function handleCheckboxChange(tipo:string, checked:boolean, func:React.Dispatch<React.SetStateAction<boolean>>,
    event: React.ChangeEvent<HTMLInputElement>): void{
      let c = contador;
      if (marcadoresEnMapa instanceof Array<mapboxgl.Marker> && marcadoresObjetoEnMapa instanceof Array<Array<Marker>>){
        func(!checked);
        let i: number = 0;
        setIsCheckedTodos(false);
        //Si esta desactivado
        if (checked){
          setConstador(contador-1);
          c--;
          marcadoresEnMapa.forEach(marcador => {
            if (marcadoresObjetoEnMapa[i].tipo == tipo){
              marcador.getElement().style.display= 'none';
            }
            i++;
          });
        //Si esta activado
        }else{
          setConstador(contador+1);
          c++;
          marcadoresEnMapa.forEach(marcador => {
            if (marcadoresObjetoEnMapa[i].tipo == tipo){
              marcador.getElement().style.display= 'block';
            }
            i++;
          });
        }

        c==6?setIsCheckedTodos(true):setIsCheckedTodos(false);
      }
  }
  

  return (
  <>
  <div className='filtro'>
    <h2>Filtros</h2>
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