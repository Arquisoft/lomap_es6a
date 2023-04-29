import React from "react";
import { render, screen } from '@testing-library/react';
import { Session } from "@inrupt/solid-client-authn-browser";
import Amigos from "../components/amigos/amigos";
import BuscarAmigo from "../components/amigos/buscarAmigo";

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
});