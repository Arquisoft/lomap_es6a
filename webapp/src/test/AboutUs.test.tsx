import React from "react";
import { render, screen } from '@testing-library/react';
import AboutUs from "../components/aboutus/AboutUs";
import { Session } from "@inrupt/solid-client-authn-browser";

const session = new Session();
session.info.isLoggedIn = true;

test('renders AboutUs component without log in fail', () => {
    expect(() => render(<AboutUs session={new Session()}/>)).toThrow();
});

test('renders AboutUs component without crashing', () => {
    render(<AboutUs session={session}/>);
});

test('AboutUs contains the correct text', () => {
    render(<AboutUs session={session}/>);
    expect(screen.queryByText(/About Us/i)).toBeInTheDocument(); 
});

test('AboutUs contains the correct number of team members', () => {
    const {container} = render(<AboutUs session={session}/>);
    const divs = container.getElementsByClassName('member');
    expect(divs.length).toBe(5);
});

test('AboutUs contains the 5 members and their names, roles and descriptions', () => {
    const {container} = render(<AboutUs session={session}/>);
    const divs = container.getElementsByClassName('member');

    expect(divs[0].textContent).toBe('Javier Novella' + 
        'Developer' + 
        'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y saxofonista profesional del conservatorio de Oviedo'
    );
    expect(divs[1].textContent).toBe('Rubén Díaz' + 
        'Developer' + 
        'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica'
    );
    expect(divs[2].textContent).toBe('Alonso Antuña' + 
        'Developer' + 
        'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica'
    );
    expect(divs[3].textContent).toBe('Pablo Fernández' + 
        'Developer' + 
        'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica'
    );
    expect(divs[4].textContent).toBe('Sergio Moro' + 
        'Developer' + 
        'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica'
    );
});