import React from "react";
import { render, screen } from '@testing-library/react';
import Amigos from "../components/amigos/amigos";
import BuscarAmigos from "../components/amigos/buscarAmigo";
import { Session } from "@inrupt/solid-client-authn-node";

test('renders Amigos component without crashing', () => {
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net"
    }).then(() => {
        if (session.info.isLoggedIn) {
            render(<Amigos/>);
            expect(screen.queryByText(/Bienvenido a amigos/i)).toBeInTheDocument();
        } else {
            fail();
        }
    });
});