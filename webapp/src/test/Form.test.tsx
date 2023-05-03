import Form from "../components/mapa/form";
import { Session } from "@inrupt/solid-client-authn-browser";
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import * as adaptador from "../accesoPods/adaptador";
import Marker from "../accesoPods/marker";
import Comentario from "../accesoPods/comentario";
import mapboxgl from 'mapbox-gl'
import { SessionProvider } from "@inrupt/solid-ui-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import { createElement } from "react";
//import Map from '@/components/modules/Home/Map/Map'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(),
  Marker: jest.fn().mockReturnValue({
    setLngLat: jest.fn().mockReturnValue({
      setPopup: jest.fn().mockReturnValue({
        addTo: jest.fn().mockReturnValue({})
      })
    })
  }),
  Popup: jest.fn().mockReturnValue({
    setHTML: jest.fn().mockReturnValue({ on: jest.fn() })
  })
}))
// jest.mock('mapbox-gl', () => ({
//     Geolocation.getCurrentPosition(): () => ({})
//   }))
// jest.mock('mapbox-gl', () => ({
//     GeolocationCoordinates : {
//     accuracy: number,
//     altitude: number | null,
//     altitudeAccuracy: number | null,
//     heading: number | null,
//     latitude: number,
//     longitude: number,
//     speed: number | null,
//     }
// }))
jest.mock('mapbox-gl', () => ({
   
    Geolocation : {getCurrentPosition :()=> { 
        var pos ={
            coords:{
                acurracy: 5,
                altitude: 20,
                latitude: 20
            },
            timestamp:40
        }
        // new GeolocationPosition();
        // readonly coords: GeolocationCoordinates;
        // readonly timestamp: EpochTimeStamp;
        // jest.mock('mapbox-gl', () => ({
        //     pos : {
        //         acurracy: 5,
        //         altitude: 20,
        //         latitude: 20
        //     }        
        // }))
        
        return  pos   } }
  }))
const session = new Session();
session.info.isLoggedIn = true;
session.info.webId = "https://testasw.inrupt.net/profile/card#me";

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(),
  Marker: jest.fn().mockReturnValue({
    setLngLat: jest.fn().mockReturnValue({
      setPopup: jest.fn().mockReturnValue({
        addTo: jest.fn().mockReturnValue({})
      })
    })
  }),
  Popup: jest.fn().mockReturnValue({
    setHTML: jest.fn().mockReturnValue({ on: jest.fn() })
  })
}))
jest.mock('mapbox-gl', () => ({
    Geolocation : {getCurrentPosition :()=> { 
        var pos ={
            coords:{
                acurracy: 5,
                altitude: 20,
                latitude: 20
            },
            timestamp:40
        }
        
        return  pos   
    }}
}));

const marcador1 = new Marker("1","MasYMas","Supermercado",1,1,"Tienda");
const marcador2 = new Marker("2","MasYMas","Supermercado",1,1,"Tienda");
const marcador3 = new Marker("3","Alimerka","Supermercado",2,2,"Tienda");
const marcador4 = new Marker("4","Carrefour","Supermercado",3,3,"Tienda");
const comentario1 = new Comentario("Muy buena","3","uo282944","9");
const comentario2 = new Comentario("Muy guapa","3","uo282944","8");

beforeAll(()=>{
  jest.spyOn(adaptador, "guardarMarcador").mockImplementation(
        (session: Session, nombre: string, descripcion:string, lat: number, lng: number, tipo: string,imagen:string): Marker | null => marcador1
    );

jest.spyOn(adaptador, "guardarMarcadorSinImagen").mockImplementation(
    (session: Session, nombre: string, descripcion:string, lat: number, lng: number, tipo: string): Marker | null => marcador2
);

jest.spyOn(adaptador, "guardarComentario").mockImplementation(
    (session: Session, texto: string, idmarker: string, autor: string, valoracion: string, user: string): Comentario | null => comentario1
);

jest.spyOn(adaptador, "recuperarMarcador").mockImplementation(
    (session: Session, user: string): Promise<Marker[] | null> => Promise.resolve([marcador3, marcador4])
);

jest.spyOn(adaptador, "recuperarComentario").mockImplementation(
    (session: Session, idmarker: String, user: string): Promise<Comentario[] | null> => Promise.resolve([comentario1, comentario2])
);


})


test('renders Form component without crashing', async () => {


    
    render( <>
        <SessionProvider sessionId="logIn">
          <Router>
              <div className='contenedor-rutas'>
              <Form session={session} modo={false}/>
              </div>
              
            </Router>
              </SessionProvider>
              </> );
    expect(screen.getByText(/Añadir Marcador/i)).toBeInTheDocument();
    expect(screen.getByText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByText(/Descripcion:/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitud:/i)).toBeInTheDocument();
    expect(screen.getByText(/Latitud:/i)).toBeInTheDocument();
    expect(screen.getByText(/Tipo:/i)).toBeInTheDocument();

    expect(screen.getByLabelText("tipo-Gasolinera")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Bar")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Tienda")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Paisaje")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Monumento")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Restaurante")).toBeInTheDocument();



    expect(screen.getByLabelText("tipo-Gasolinera")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Bar")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Tienda")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Paisaje")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Monumento")).toBeInTheDocument();
    expect(screen.getByLabelText("tipo-Restaurante")).toBeInTheDocument();


    expect(screen.getByText(/Añade una imagen/i)).toBeInTheDocument();
    expect(screen.getByText("Añadir")).toBeInTheDocument();

    expect(screen.getByText(/Filtros/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Todos/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Bar")).toBeInTheDocument();
    expect(screen.getByLabelText("Tienda")).toBeInTheDocument();
    expect(screen.getByLabelText("Gasolinera")).toBeInTheDocument();
    expect(screen.getByLabelText("Paisaje")).toBeInTheDocument();
    expect(screen.getByLabelText("Monumento")).toBeInTheDocument();
    expect(screen.getByLabelText("Restaurante")).toBeInTheDocument();
});

test('testing form validators', async () =>{
  render(<Form session={session} modo={false}/>);

  //Testeo nombre

  var nombre = screen.getByLabelText("form-nombre")
  expect(nombre).toBeInTheDocument();

  fireEvent.change(nombre,{target: {value:""}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("El campo Nombre es obligatorio")).toBeInTheDocument();

  fireEvent.change(nombre,{target: {value:"qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Nombre no debe ser superior a 20")).toBeInTheDocument();

  //Testeo descipcion

  var descripcion = screen.getByLabelText("form-descripcion")
  expect(descripcion).toBeInTheDocument();

  fireEvent.change(descripcion,{target: {value:""}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("El campo Descripción es obligatorio")).toBeInTheDocument();

  fireEvent.change(descripcion,{target: {value:"qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"+
  "qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmmqwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"
  +
  "qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmmqwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"
  +
  "qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmmqwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Descripción no debe ser superior a 100")).toBeInTheDocument();

  //Testeo longitud

  var longitud = screen.getByLabelText("form-longitud")
  expect(longitud).toBeInTheDocument();

  fireEvent.change(longitud,{target: {value:""}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Longitud es obligatoria")).toBeInTheDocument();
  fireEvent.change(longitud,{target: {value: 1000}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Longitud debe estar entre -180 y 180")).toBeInTheDocument();
  fireEvent.change(longitud,{target: {value: -1000}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Longitud debe estar entre -180 y 180")).toBeInTheDocument();

  //Testeo latitud

  var latitud = screen.getByLabelText("form-latitud")
  expect(latitud).toBeInTheDocument();

  fireEvent.change(latitud,{target: {value:""}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Latitud es obligatoria")).toBeInTheDocument();
  fireEvent.change(latitud,{target: {value: 1000}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Latitud debe estar entre -90 y 90")).toBeInTheDocument();
  fireEvent.change(latitud,{target: {value: -1000}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Latitud debe estar entre -90 y 90")).toBeInTheDocument();

  //Testeo tipo

  var tipo = screen.getByLabelText("form-tipo")  as HTMLSelectElement;
  expect(tipo).toBeInTheDocument();

  fireEvent.change(tipo,{target: {value:""}})
  fireEvent.click(screen.getByText("Añadir"))
  var tmp =screen.getByText("Debe elegir un Tipo de marcador")
  expect(screen.getByText("Debe elegir un Tipo de marcador")).toBeInTheDocument();

  // var tmp = within(tipo).getByLabelText("tipo-Gasolinera")
  // fireEvent.mouseDown(tmp)
  // fireEvent.keyDown(await screen.findByLabelText("tipo-Gasolinera"), {key: 'Enter'})
  //fireEvent.change(tipo,{target: {value:""}})
  //fireEvent.click(tipo)
  //fireEvent.select(screen.getByLabelText("tipo-Gasolinera"))
  //fireEvent.click(screen.getByLabelText("tipo-Gasolinera"))
  fireEvent.change(tipo, { target: { value: "Gasolinera" } })
  //let options = screen.getAllByTestId('select-option')
 // expect(options[0]).toBeFalsy();
 // expect(options[1]).toBeTruthy();
 // expect(options[2]).toBeFalsy();


  // fireEvent.click(screen.getByText("Añadir"))
  // const elem = document.createElement('div');
  // elem.classList.add('error');
  // elem.textContent = 'Debe elegir un Tipo de marcador';
  

  //var t =createElement({<div className="error">Debe elegir un Tipo de marcador</div>})
  //expect(screen.getByText("Debe elegir un Tipo de marcador")).not.toBeInTheDocument();
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.queryByText("Debe elegir un Tipo de marcador")).not.toBeInTheDocument();
  expect(tipo.value).toBe("Gasolinera");
  //in ["Bar","Restaurante","Gasolinera","Tienda","Paisaje","Monumento"]
  
  fireEvent.change(tipo, { target: { value: "Restaurante" } })
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.queryByText("Debe elegir un Tipo de marcador")).not.toBeInTheDocument();
  expect(tipo.value).toBe("Restaurante");

  fireEvent.change(tipo, { target: { value: "Bar" } })
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.queryByText("Debe elegir un Tipo de marcador")).not.toBeInTheDocument();
  expect(tipo.value).toBe("Bar");

  fireEvent.change(tipo, { target: { value: "Tienda" } })
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.queryByText("Debe elegir un Tipo de marcador")).not.toBeInTheDocument();
  expect(tipo.value).toBe("Tienda");

  fireEvent.change(tipo, { target: { value: "Paisaje" } })
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.queryByText("Debe elegir un Tipo de marcador")).not.toBeInTheDocument();
  expect(tipo.value).toBe("Paisaje");

  fireEvent.change(tipo, { target: { value: "Monumento" } })
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.queryByText("Debe elegir un Tipo de marcador")).not.toBeInTheDocument();
  expect(tipo.value).toBe("Monumento");

  //Testeo todo bien

  fireEvent.change(nombre,{target: {value:"Hola"}})
  fireEvent.change(descripcion,{target: {value:"Muy buen sitio"}})
  fireEvent.change(longitud,{target: {value:"43"}})
  fireEvent.change(latitud,{target: {value:"-5"}})
  fireEvent.change(tipo,{target: {value:"Gasolinera"}})
  fireEvent.click(screen.getByText("Añadir"))
    expect(screen.getByText("Añadir")).toBeInTheDocument();

    expect(screen.getByText(/Filtros/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Todos/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Bar")).toBeInTheDocument();
    expect(screen.getByLabelText("Tienda")).toBeInTheDocument();
    expect(screen.getByLabelText("Gasolinera")).toBeInTheDocument();
    expect(screen.getByLabelText("Paisaje")).toBeInTheDocument();
    expect(screen.getByLabelText("Monumento")).toBeInTheDocument();
    expect(screen.getByLabelText("Restaurante")).toBeInTheDocument();

  fireEvent.change(nombre,{target: {value:"Hola"}})
  fireEvent.change(descripcion,{target: {value:"Muy buen sitio"}})
  fireEvent.change(longitud,{target: {value:"43"}})
  fireEvent.change(latitud,{target: {value:"-5"}})
  fireEvent.change(tipo,{target: {value:"Tienda"}})
  fireEvent.click(screen.getByText("Añadir"))

  fireEvent.change(nombre,{target: {value:"Hola"}})
  fireEvent.change(descripcion,{target: {value:"Muy buen sitio"}})
  fireEvent.change(longitud,{target: {value:"43"}})
  fireEvent.change(latitud,{target: {value:"-5"}})
  fireEvent.change(tipo,{target: {value:"Bar"}})
  fireEvent.click(screen.getByText("Añadir"))

  fireEvent.change(nombre,{target: {value:"Hola"}})
  fireEvent.change(descripcion,{target: {value:"Muy buen sitio"}})
  fireEvent.change(longitud,{target: {value:"43"}})
  fireEvent.change(latitud,{target: {value:"-5"}})
  fireEvent.change(tipo,{target: {value:"Monumento"}})
  fireEvent.click(screen.getByText("Añadir"))
    
  fireEvent.change(nombre,{target: {value:"Hola"}})
  fireEvent.change(descripcion,{target: {value:"Muy buen sitio"}})
  fireEvent.change(longitud,{target: {value:"43"}})
  fireEvent.change(latitud,{target: {value:"-5"}})
  fireEvent.change(tipo,{target: {value:"Paisaje"}})
  fireEvent.click(screen.getByText("Añadir"))

  fireEvent.change(nombre,{target: {value:"Hola"}})
  fireEvent.change(descripcion,{target: {value:"Muy buen sitio"}})
  fireEvent.change(longitud,{target: {value:"43"}})
  fireEvent.change(latitud,{target: {value:"-5"}})
  fireEvent.change(tipo,{target: {value:"Restaurante"}})
  fireEvent.click(screen.getByText("Añadir"))

  fireEvent.change(nombre,{target: {value:"Hola"}})
  fireEvent.change(descripcion,{target: {value:"Muy buen sitio"}})
  fireEvent.change(longitud,{target: {value:"43"}})
  fireEvent.change(latitud,{target: {value:"-5"}})
  fireEvent.change(tipo,{target: {value:"asdasda"}})
  fireEvent.click(screen.getByText("Añadir"))
    
});

test('testing form validators', async () =>{
  
  render( <>
    <SessionProvider sessionId="logIn">
      <Router>
          <div className='contenedor-rutas'>
          <Form session={session} modo={false}/>
          </div>
          
        </Router>
          </SessionProvider>
          </> ) ;

  //Testeo nombre

  var nombre = screen.getByLabelText("form-nombre")
  expect(nombre).toBeInTheDocument();

  fireEvent.change(nombre,{target: {value:""}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("El campo Nombre es obligatorio")).toBeInTheDocument();

  fireEvent.change(nombre,{target: {value:"qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Nombre no debe ser superior a 20")).toBeInTheDocument();

  //Testeo descipcion

  var descripcion = screen.getByLabelText("form-descripcion")
  expect(descripcion).toBeInTheDocument();

  fireEvent.change(descripcion,{target: {value:""}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("El campo Descripción es obligatorio")).toBeInTheDocument();

  fireEvent.change(descripcion,{target: {value:"qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"+
  "qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmmqwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"
  +
  "qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmmqwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"
  +
  "qwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmmqwertyuiopasdfghjklñzxcvbnmqwertyuuiiopàsdfghjklñzxcvbnmm"}})
  fireEvent.click(screen.getByText("Añadir"))
  expect(screen.getByText("Descripción no debe ser superior a 100")).toBeInTheDocument();
          //   fireEvent.change(screen.getByPlaceholderText("Username"),{
        //     target: {value: 'testASW'},
        //   });
        //   fireEvent.change(screen.getByPlaceholderText("Password"),{
        //     target: {value: '1234567890ABCabc.'},
        //   });


})