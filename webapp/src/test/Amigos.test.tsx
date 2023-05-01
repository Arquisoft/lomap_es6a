import React from "react";
import { getSolidDataset, getThing, getStringNoLocale, getUrlAll, addIri, setThing, saveSolidDatasetAt, removeIri} from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Session } from "@inrupt/solid-client-authn-browser";
import Amigos from "../components/amigos/amigos";
import BuscarAmigo from "../components/amigos/buscarAmigo";

jest.setTimeout(100000);

const session = new Session();
session.info.isLoggedIn = true;
session.info.webId = "https://testasw.inrupt.net/profile/card#me";

test('renders Amigos component without log in fail', () => {
    expect(() => render(<Amigos session={new Session()}/>)).toThrow();
});

test('renders Amigos component without crashing', () => {
    render(<Amigos session={session}/>);
    expect(screen.getByText(/Bienvenido a Amigos/i)).toBeInTheDocument();
});

test('renders BuscarAmigo component without crashing with WebId', () => {
    render(<BuscarAmigo session={session}/>);

    expect(screen.getByText(/Buscar Perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/Mis Amigos:/i)).toBeInTheDocument();
    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByLabelText("searchButton")).toBeInTheDocument();
    expect(screen.getByText(/No tienes amigos aún./i)).toBeInTheDocument();
});

test('buscar un amigo without name', async () => {
    const { getByLabelText } = render(<BuscarAmigo session={session}/>);;
    const searchButton = getByLabelText("searchButton");

    fireEvent.click(searchButton);

    await waitFor(() => {
        expect(screen.getByText("request to https://.inrupt.net/profile/card#me failed, reason: getaddrinfo ENOTFOUND .inrupt.net")).toBeInTheDocument();
    });
});

test('buscar y añadir un amigo', async () => {
    const { getByLabelText } = render(<BuscarAmigo session={session}/>);
    const inputField = getByLabelText("username");
    const searchButton = getByLabelText("searchButton");

    fireEvent.change(inputField, { target: { value: "testasw" } } );
    fireEvent.click(searchButton);

    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();  

    await waitFor(() => {
        const addButton = getByLabelText("addButton");

        expect(screen.getByText(/Nombre: testASW/i)).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();

        fireEvent.click(addButton);
    }, { timeout: 10000 });  
});

// test("debería devolver una cadena vacía si el nombre no coincide con ninguno de los amigos conocidos", async () => {
//     const nombreAmigo = "Juan Pérez";
//     const amigosUrl = [      
//         "https://amigo1.inrupt.net/profile/card#me",      
//         "https://amigo2.inrupt.net/profile/card#me",      
//         "https://amigo3.inrupt.net/profile/card#me",    
//     ];

//     // Simulamos la carga de los datasets de los amigos
//     const getSolidDatasetMock = jest.fn();
//     getSolidDatasetMock.mockResolvedValue({});

//     // Simulamos la carga de las cosas de los amigos
//     const getThingMock = jest.fn();
//     getThingMock.mockReturnValue({});

//     // Simulamos la obtención del nombre de los amigos
//     const getStringNoLocaleMock = jest.fn();
//     getStringNoLocaleMock.mockReturnValue("otro nombre");

//     // Simulamos la obtención de los amigos conocidos del usuario
//     const getUrlAllMock = jest.fn();
//     getUrlAllMock.mockReturnValueOnce(amigosUrl);

//     const amigoUrl = await encontrarUrl(nombreAmigo);

//     expect(getSolidDatasetMock).toHaveBeenCalledTimes(amigosUrl.length);
//     expect(getThingMock).toHaveBeenCalledTimes(amigosUrl.length);
//     expect(getStringNoLocaleMock).toHaveBeenCalledTimes(amigosUrl.length);
//     expect(getUrlAllMock).toHaveBeenCalledTimes(1);
//     expect(amigoUrl).toBe("");
// });