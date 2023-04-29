import React from "react";
import { render, screen } from '@testing-library/react';
import MapaPrincipal from "../components/mapa/Principal-mapa";
import { Session } from "@inrupt/solid-client-authn-browser";

const session = new Session();
session.info.isLoggedIn = true;

test('renders MapaPrincipal component without log in fail', () => {
    expect(() => render(<MapaPrincipal session={new Session()}/>)).toThrow();
});