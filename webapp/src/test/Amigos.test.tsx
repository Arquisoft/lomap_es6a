import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Session } from "@inrupt/solid-client-authn-browser";
import Amigos from "../components/amigos/amigos";
import BuscarAmigo from "../components/amigos/buscarAmigo";

jest.setTimeout(100000000);

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

test('buscar y añadir un amigo', async () => {
    const AmigosMios = render(<BuscarAmigo session={session}/>);

    const { getByLabelText } = AmigosMios;
    const inputField = getByLabelText("username");
    const searchButton = getByLabelText("searchButton");

    fireEvent.change(inputField, { target: { value: "rubenndiazz5" } } );
    fireEvent.click(searchButton);

    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();  

    await waitFor(() => {
        const addButton = getByLabelText("addButton");

        expect(screen.getByText(/Nombre: Ruben Diaz/i)).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();

        fireEvent.click(addButton);
    }, { timeout: 5000 });

    // await waitFor(() => {
    //     const deleteButton = getByLabelText("deleteButton");
    //     const mapaLink = getByLabelText("mapaLink");
    // }, { timeout: 100000 });
});  