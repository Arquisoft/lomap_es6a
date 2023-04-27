import React from 'react';
import { render, screen, fireEvent,AllByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Session, getDefaultSession } from "@inrupt/solid-client-authn-browser";
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import Home from "../components/home/home";
import ProfileViewer from '../components/Login/ProfileViewer';
import nav from "../components/fragments/nav";
import { useSession } from "@inrupt/solid-ui-react";
import Form from '../components/mapa/form';
import MapaAmigos from '../components/mapa/mapa';
import Marker from '../accesoPods/marker';
import {guardarMarcador, guardarMarcadorSinImagen} from "../accesoPods/adaptador";
//import { Session } from "@inrupt/solid-client-authn-node";

test('prueba login',()=>{
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net",
      //redirectUrl : "" ,
      redirectUrl: window.location.protocol + '//' + window.location.host + "/Home"
    }).then(() => {
      if (session.info.isLoggedIn) {
        // 3. Your session should now be logged in, and able to make authenticated requests.
       // session
        //console.log(`Logged in with WebID [${session.info.webId}]`);
        session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/mapa");
        var home = render(<MapaAmigos session={session}/>);

        home.findAllByText("Añadir marcador").then((tmp) => (
            expect(tmp).toBeInTheDocument()
        ));
        home.findByLabelText("Filtros").then((tmp) => (
            expect(tmp).toBeInTheDocument()
        ));

        }
        else
            fail();
        session.logout();
    });
})

describe("logedNav",()=>{
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net",
      //redirectUrl : "" ,
      redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",

    }).then(() => {
      if (session.info.isLoggedIn) {
        // 3. Your session should now be logged in, and able to make authenticated requests.
       // session
       // console.log(`Logged in with WebID [${session.info.webId}]`);
        session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/Home");
        test("renders the marker from the database", async () => {
            guardarMarcadorSinImagen({session}.session, "Marker 1", "a",  42.7128, -74.006, "Restaurante");
            render(
                <MapaAmigos session={session}/>
            );
            const marker1 = await screen.getByAltText("Marker");
            expect(marker1).toBeInTheDocument();
        })
        session.logout();
      }
    });
});


afterAll(async () => {
    await getDefaultSession().logout();
});