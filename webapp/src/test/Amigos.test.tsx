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
import Amigos from '../components/amigos/amigos';
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
        session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/amigos");
        var amigos = render(<Amigos/>);

        amigos.findAllByText("Buscar Perfil").then((tmp) => (
            expect(tmp).toBeInTheDocument()
        ));
        amigos.findByLabelText("Bienvenido a Amigos").then((tmp) => (
            expect(tmp).toBeInTheDocument()
        ));
        amigos.findByLabelText("Mis amigos").then((tmp) => (
            expect(tmp).toBeInTheDocument()
        ));
        }
        else
            fail();
        session.logout();
    });
})

afterAll(async () => {
    await getDefaultSession().logout();
});