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
import {validacionCamposComentario,crearImgHtml,seleccionarIcono} from "../components/mapa/initMap";
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

  test("check coments validator", () =>{
    
    //negativo
    equal(validacionCamposComentario("","-5"),false)
    
    equal(validacionCamposComentario("","5"),false)
    //negativo
    equal(validacionCamposComentario("2","-5"),false)


    //negativo
    equal(validacionCamposComentario("hola","-5"),false)
    //negativo
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