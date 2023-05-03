import Form from "../components/mapa/form";
import Filtro from "../components/mapa/filtro";
import { initMap } from '../components/mapa/initMap';
import { Session } from "@inrupt/solid-client-authn-browser";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as adaptador from "../accesoPods/adaptador";
import Marker from "../accesoPods/marker";
import Comentario from "../accesoPods/comentario";
import mapboxgl from 'mapbox-gl'
import { SessionProvider } from "@inrupt/solid-ui-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

test('renders Form component without crashing', async () => {
    const marcador1 = new Marker("1","MasYMas","Supermercado",1,1,"Tienda");
    const marcador2 = new Marker("2","MasYMas","Supermercado",1,1,"Tienda");
    const marcador3 = new Marker("3","Alimerka","Supermercado",2,2,"Tienda");
    const marcador4 = new Marker("4","Carrefour","Supermercado",3,3,"Tienda");
    const comentario1 = new Comentario("Muy buena","3","uo282944","9");
    const comentario2 = new Comentario("Muy guapa","3","uo282944","8");

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