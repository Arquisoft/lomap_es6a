import Form from "../components/mapa/form";
import { Session } from "@inrupt/solid-client-authn-browser";
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import * as adaptador from "../accesoPods/adaptador";
import Marker from "../accesoPods/marker";
import Comentario from "../accesoPods/comentario";
import mapboxgl ,{Map,Popup} from 'mapbox-gl';
import { SessionProvider } from "@inrupt/solid-ui-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import { createElement } from "react";
import {validacionCamposComentario,crearImgHtml,seleccionarIcono, initMap,cargarMarcadores,onMarkerClick} from "../components/mapa/initMap";
import React from 'react';
import { equal } from "assert";
import casa from '../imagenes/marcador.png';
import bar from '../imagenes/bar.png';
import restaurante from '../imagenes/restaurante.png';
import gasolinera from '../imagenes/gasolinera.png';
import tienda from '../imagenes/tienda.png';
import paisaje from '../imagenes/paisaje.png';
import monumento from '../imagenes/monumento.png';
import interrogacion from '../imagenes/interrogacion.png';
import { setupJestCanvasMock } from 'jest-webgl-canvas-mock';
import { Check } from "@material-ui/icons";
const WorkerPlugin = require('worker-plugin');
const WorkerPlugin2 = require('worker-loader');
const WorkerPlugin3 = require('worker_threads');
// En lugar de:
// const worker = new Worker('./path/to/worker.js');


const marcador1 = new Marker("1","MasYMas","Supermercado",1,1,"Tienda");
const marcador2 = new Marker("2","MasYMas","Supermercado",1,1,"Tienda");
const marcador3 = new Marker("3","Alimerka","Supermercado",2,2,"Tienda");
const marcador4 = new Marker("4","Carrefour","Supermercado",3,3,"Tienda");
const comentario1 = new Comentario("Muy buena","3","uo282944","9");
const comentario2 = new Comentario("Muy guapa","3","uo282944","8");

const session = new Session();
session.info.isLoggedIn = true;
beforeAll(()=>{
  setupJestCanvasMock();
//   const workerMock = jest.fn().mockImplementation(() => {
//     return {
//       postMessage: jest.fn(),
//       onmessage: jest.fn(),
//       onerror: jest.fn(),
//     };
//   });
const { Worker } = require('worker_threads');
//globalThis.target.addEventListener
  //globalThis.Worker =  Worker 

//   globalThis.Worker = jest.fn();
//   globalThis.addEventListener = jest.fn();
  jest.spyOn(adaptador, "guardarMarcador").mockImplementation(
          (session: Session, nombre: string, descripcion:string, lat: number, lng: number, tipo: string,imagen:string): Marker | null => marcador1
      );
  
  jest.spyOn(adaptador, "guardarMarcadorSinImagen").mockImplementation(
      (session: Session, nombre: string, descripcion:string, lat: number, lng: number, tipo: string): Marker | null => marcador2
  );
  
  jest.spyOn(adaptador, "guardarComentario").mockImplementation(
      (session: Session, texto: string, idmarker: string, autor: string, valoracion: string, user: string): Comentario | null => comentario1
  );
  
//   jest.spyOn(adaptador, "recuperarMarcador").mockImplementation(
//       (session: Session, user: string): Promise<Marker[] | null> => Promise.resolve([marcador3, marcador4])
//   );
  
//   jest.spyOn(adaptador, "recuperarComentario").mockImplementation(
//       (session: Session, idmarker: String, user: string): Promise<Comentario[] | null> => Promise.resolve([comentario1, comentario2])
//   );
  
  
  })

  test("check coments validator", () =>{
    
    //negativo
    equal(validacionCamposComentario("","-5"),false)
    
    equal(validacionCamposComentario("","5"),false)
    //negativo
    equal(validacionCamposComentario("2","-5"),false)


    //negativo
    equal(validacionCamposComentario("hola","-5"),false)
    //positivo
    equal(validacionCamposComentario("hola","4"),true)


});


test("check icon selection",() =>{
    
    var icono =seleccionarIcono("Bar")
    expect(icono.height).toBe(30);
    expect(icono.width).toBe(30);
    expect(icono.src).toBe("http://localhost/"+bar);
    
    var icono =seleccionarIcono("Restaurante")
    expect(icono.height).toBe(30);
    expect(icono.width).toBe(30);
    expect(icono.src).toBe("http://localhost/"+restaurante);

    var icono =seleccionarIcono("Gasolinera")
    expect(icono.height).toBe(30);
    expect(icono.width).toBe(30);
    expect(icono.src).toBe("http://localhost/"+gasolinera);

    var icono =seleccionarIcono("Tienda")
    expect(icono.height).toBe(30);
    expect(icono.width).toBe(30);
    expect(icono.src).toBe("http://localhost/"+tienda);

    var icono =seleccionarIcono("Paisaje")
    expect(icono.height).toBe(30);
    expect(icono.width).toBe(30);
    expect(icono.src).toBe("http://localhost/"+paisaje);

    var icono =seleccionarIcono("Monumento")
    expect(icono.height).toBe(30);
    expect(icono.width).toBe(30);
    expect(icono.src).toBe("http://localhost/"+monumento);

    var icono =seleccionarIcono("Cualquier otra cosa")
    expect(icono.height).toBe(30);
    expect(icono.width).toBe(30);
    expect(icono.src).toBe("http://localhost/"+interrogacion);


})
// jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
//     Map: () => ({})
//  }));
// test("render initMap test",()=>{
      
//   const mapRef = document.createElement("HTMLDivElement") as HTMLDivElement
//   let tupla: [mapboxgl.Map,Array<mapboxgl.Marker>,Array<Marker>];
//   //const [marcadores, setMarcadores] = useState(Array<mapboxgl.Marker>);
//  // const [marcadoresObjeto, setMarcadoresObjeto] = useState(Array<Marker>);
//   let mapa: mapboxgl.Map;

//   let nombreUsuario = "";
//   if (session.info.isLoggedIn) {
//     const user = session.info.webId;
    
//     if (user) {
//       nombreUsuario = user.split('//')[1].split('.')[0];
//     }
//      }

     
//     tupla = initMap(mapRef, {session}, nombreUsuario);
      
    
//     // render(<div className="map mapboxgl-map">
//     //     <initMap container = {mapRef}/>
//     // </div>)
//     render(<>
//         <SessionProvider sessionId="logIn">
//           <Router>
//               <div className='contenedor-rutas'>
//               <Form session={session} modo={false}/>
//               </div>
              
//             </Router>
//               </SessionProvider>
//               </>)
//     //render(<initMap session={session} modo={false}/>)
// })
// test('debe inicializar el mapa correctamente', () => {
//     const container = document.createElement('div');
//    // const session = new Session();
//     const user = 'Usuario de prueba';
//     initMap(container, { session }, user);
//     expect(container.querySelector('.mapboxgl-canvas')).toBeTruthy();
// })
// jest.mock('')
// this.global.Worker = jest.fn(() => ({
//     postMessage: () => {},
//     terminate: () => {}
//   }));

  
// test('test cargar marcadores',async() =>{
//     var Marcadores = [marcador1,marcador2,marcador3,marcador4]
//     const marcadoresEnMapa: Array<mapboxgl.Marker> = [];
//     const marcadoresObjetoEnMapa: Array<Marker> = [];
//     const user = 'Usuario de prueba';
   
//     let userMarkers: Marker[]
//       userMarkers = [];
//     var container =  document.createElement('div');
//     var popupElement:Popup;
//     const mapa = new Map({
//         container,
//         style: 'mapbox://styles/mapbox/streets-v12',
//         pitchWithRotate: false,
//         zoom: 15,
//         accessToken: "pk.eyJ1IjoidW8yODI4MzQiLCJhIjoiY2xlcHp5Z2syMGRteTQ5cDJ2dXltMm5uYSJ9.kTLZTl2_YvQiN79m2kPQ1g",
//         doubleClickZoom: false
        
//     });
    
//     await adaptador.recuperarMarcador({session}.session,user).then(markers => {
//         if (markers != null) {
//             cargarMarcadores(markers,mapa,marcadoresEnMapa,marcadoresObjetoEnMapa,popupElement,session,user)
//         }})
    

// })

test("click on marker",async ()=>{
    const user = 'Usuario de prueba';
    var Marcadores = [marcador1,marcador2,marcador3,marcador4]
    const marcadoresEnMapa: Array<mapboxgl.Marker> = [];
    const marcadoresObjetoEnMapa: Array<Marker> = [];
    //const user = 'Usuario de prueba';
   
    let userMarkers: Marker[]
      userMarkers = [];
    var container =  document.createElement('div');
    var popupElement:Popup = new mapboxgl.Popup;
    var markers = [marcador3, marcador4]//await adaptador.recuperarMarcador({session}.session,user)
    var market =markers ? markers[0] : new Marker("","","",0,0,"");
        let iconMarker :HTMLImageElement;
        iconMarker = seleccionarIcono(market.tipo);
       // iconMarker = seleccionarIcono(market.tipo);
          let marker = new mapboxgl.Marker({ element: iconMarker })
          .setLngLat([market.latitude, market.longitude])
          .setPopup(new Popup({ closeButton: false, anchor: 'left', maxWidth: '400px' })
          .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${market.longitude}, ${market.latitude}]</div>`))
          marcadoresEnMapa.push(marker);
          marcadoresObjetoEnMapa.push(market);     


        if (markers != null) {
            onMarkerClick(marker,popupElement,session,user,markers[0])
        }
        // var tmp = render(marker.getElement())
        // expect( tmp.getByLabelText("marcadorForm")).toBeInTheDocument();
       // marker.getPopup().setHTML
        // const html = marker.getElement().innerHTML;
        // const element = <div dangerouslySetInnerHTML={{ __html: html }} />;
        // onMarkerClick(marker,popupElement,session,user,markers[0])
        // const { getByLabelText } = render(element);
        //expect(getByLabelText('marcadorForm')).toBeInTheDocument();


        var market =markers ? markers[1] : new Marker("","","",0,0,"");
        
        iconMarker = seleccionarIcono(market.tipo);
       // iconMarker = seleccionarIcono(market.tipo);
           marker = new mapboxgl.Marker({ element: iconMarker })
          .setLngLat([market.latitude, market.longitude])
          .setPopup(new Popup({ closeButton: false, anchor: 'left', maxWidth: '400px' })
          .setHTML(`<div class="popup">Chincheta añadida aquí: <br/>[${market.longitude}, ${market.latitude}]</div>`))
          marcadoresEnMapa.push(marker);
          marcadoresObjetoEnMapa.push(market);     


        if (markers != null) {
            onMarkerClick(marker,popupElement,session,user,markers[1])
        }

    
})

