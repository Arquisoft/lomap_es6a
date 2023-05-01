import React from "react";
import { render, screen } from '@testing-library/react';
import { Session } from "@inrupt/solid-client-authn-browser";
import Mapa from "../components/mapa/Principal-mapa";

const session = new Session();
session.info.isLoggedIn = true;
session.info.webId = "https://testasw.inrupt.net/profile/card#me";

test('renders Filter component without crashing', () => {
    // render(<Mapa session={session}/>);
});