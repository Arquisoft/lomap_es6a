import Form from "../components/mapa/form";
import Filtro from "../components/mapa/filtro";
import { initMap } from '../components/mapa/initMap';
import { Session } from "@inrupt/solid-client-authn-browser";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as adaptador from "../accesoPods/adaptador";
import Marker from "../accesoPods/marker";
import Comentario from "../accesoPods/comentario";

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

    render(<Form session={session} modo={false}/>);
    expect(screen.getByText(/Añadir Marcador/i)).toBeInTheDocument();
    expect(screen.getByText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByText(/Descripcion:/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitud:/i)).toBeInTheDocument();
    expect(screen.getByText(/Latitud:/i)).toBeInTheDocument();
    expect(screen.getByText(/Tipo:/i)).toBeInTheDocument();
    expect(screen.getByText(/Añade una imagen/i)).toBeInTheDocument();
});
