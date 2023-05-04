import Form from "../components/mapa/form";
import Filtro from "../components/mapa/filtro";
import { Session } from "@inrupt/solid-client-authn-browser";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as adaptador from "../accesoPods/adaptador";
import Marker from "../accesoPods/marker";
import Comentario from "../accesoPods/comentario";
import mapboxgl from "mapbox-gl";

const session = new Session();
session.info.isLoggedIn = true;
session.info.webId = "https://testasw.inrupt.net/profile/card#me"; 

test('renders Filter component without crashing', () => {
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

    const marcador1 = new Marker("1","MasYMas","Supermercado",1,1,"Tienda");
    const marcador2 = new Marker("2","MasYMas","Supermercado",2,2,"Tienda");
    const marker1 =  new mapboxgl.Marker().setLngLat([1, 1]);
    const marker2 =  new mapboxgl.Marker().setLngLat([1, 1]);
    const arrayMarcadores: mapboxgl.Marker[] = [marker1,marker2];
    const arrayMarcadoresLocales: Marker[] = [marcador1,marcador2];
    const filtro = render(<Filtro marcadores={arrayMarcadores} marcadoresObjeto={arrayMarcadoresLocales}/>);

    const checkTodos = filtro.getByLabelText(/Todos/i);
    const checkBar = filtro.getByLabelText(/Bar/i);
    const checkTienda = filtro.getByLabelText(/Tienda/i);
    const checkGas = filtro.getByLabelText(/Gasolinera/i);
    const checkPaisaje = filtro.getByLabelText(/Paisaje/i);
    const checkMonumento = filtro.getByLabelText(/Monumento/i);
    const checkResta = filtro.getByLabelText(/Restaurante/i);

    expect(checkTodos).toBeInTheDocument();
    expect(checkBar).toBeInTheDocument();
    expect(checkTienda).toBeInTheDocument(); 
    expect(checkGas).toBeInTheDocument();
    expect(checkPaisaje).toBeInTheDocument();
    expect(checkMonumento).toBeInTheDocument();
    expect(checkResta).toBeInTheDocument();

    expect(checkTodos).toBeChecked();
    expect(checkBar).toBeChecked();
    expect(checkTienda).toBeChecked();
    expect(checkGas).toBeChecked();
    expect(checkPaisaje).toBeChecked();
    expect(checkMonumento).toBeChecked();
    expect(checkResta).toBeChecked();

    fireEvent.click(checkTodos);
    fireEvent.click(checkBar);
    fireEvent.click(checkTienda);
    fireEvent.click(checkGas);
    fireEvent.click(checkPaisaje);
    fireEvent.click(checkMonumento);
    fireEvent.click(checkResta);
});

test('renders Filter component without crashing', () => {
    const marcador1 = new Marker("1","MasYMas","Supermercado",1,1,"Tienda");
    const marcador2 = new Marker("2","MasYMas","Supermercado",2,2,"Tienda");
    const marker1 =  new mapboxgl.Marker().setLngLat([1, 1]);
    const marker2 =  new mapboxgl.Marker().setLngLat([1, 1]);
    const arrayMarcadores: mapboxgl.Marker[] = [marker1,marker2];
    const arrayMarcadoresLocales: Marker[] = [marcador1,marcador2];
    const filtro = render(<Filtro marcadores={arrayMarcadores} marcadoresObjeto={arrayMarcadoresLocales} />);
    const {container} = filtro;
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('6');

    const checkTodos = filtro.getByLabelText(/Todos/i);
    const checkBar = filtro.getByLabelText(/Bar/i);
    const checkTienda = filtro.getByLabelText(/Tienda/i);
    const checkGas = filtro.getByLabelText(/Gasolinera/i);
    const checkPaisaje = filtro.getByLabelText(/Paisaje/i);
    const checkMonumento = filtro.getByLabelText(/Monumento/i);
    const checkResta = filtro.getByLabelText(/Restaurante/i);

    fireEvent.click(checkTodos);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('0');
    fireEvent.click(checkBar);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('1');
    fireEvent.click(checkTienda);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('2');
    fireEvent.click(checkGas);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('3'); 
    fireEvent.click(checkResta);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('4');
    fireEvent.click(checkPaisaje);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('5');
    fireEvent.click(checkMonumento);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('6');
    fireEvent.click(checkResta);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('5');
    fireEvent.click(checkTodos);
    expect(container.querySelector('.prueba_contador_filtro')?.textContent).toBe('6');
});