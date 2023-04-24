import Mapa from '../components/mapa/Principal-mapa';
import { render, screen, fireEvent } from '@testing-library/react';
import { Session,  ISessionOptions} from "@inrupt/solid-client-authn-browser";
import { useState, useEffect } from 'react';
const auth = require('solid-auth-client')

const session = auth.login({
    oidcIssuer: 'https://inrupt.net',
    clientId: 'uo282944',
    redirectUri: 'http://localhost:3000/mapa',
    handleRedirect: true
  });



test('renders LoginForm component without crashing', () => {
    console.log(session);
    render(<Mapa session={session}/>);
});