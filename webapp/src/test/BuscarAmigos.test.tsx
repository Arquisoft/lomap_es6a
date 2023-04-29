import { Session, getDefaultSession } from "@inrupt/solid-client-authn-browser";
import Amigos from '../components/amigos/amigos';
import { render, screen } from '@testing-library/react';
import { Navigate } from 'react-router-dom';
import Home from "../components/home/home";
import { MemoryRouter } from 'react-router-dom';
import BuscarAmigo from "../components/amigos/buscarAmigo";

test('testing Amigos', async () => { 
    var buscarAmigos = render(<BuscarAmigo/>);
    
    await buscarAmigos.findByText("Buscar Perfil").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    });
    await buscarAmigos.findByText("Mis Amigos:").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    });
    await buscarAmigos.findByLabelText("username").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    });

     expect(await screen.findByLabelText("searchButton")).toBeInTheDocument()
  }
);
