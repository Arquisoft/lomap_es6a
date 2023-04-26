import React from "react";
import { render, screen } from '@testing-library/react';
import AboutUs from "../components/aboutus/AboutUs";
import { Session } from "@inrupt/solid-client-authn-node";

test('renders AboutUs component without crashing', () => {
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net"
    }).then(() => {
        if (session.info.isLoggedIn) {
            render(<AboutUs/>);
        } else {
            fail();
        }
    });
});

test('AboutUs contains the correct text', () => {
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net"
    }).then(() => {
        if (session.info.isLoggedIn) {
            render(<AboutUs/>);
            expect(screen.queryByText(/About Us/i)).toBeInTheDocument();
        } else {
            fail();
        }
    });    
});

test('AboutUs contains the correct number of team members', () => {
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net"
    }).then(() => {
        if (session.info.isLoggedIn) {
            const {container} = render(<AboutUs/>);
            const divs = container.getElementsByClassName('member');
            expect(divs.length).toBe(5);
        } else {
            fail();
        }
    }); 
});

test('AboutUs contains the 5 members and their names, roles and descriptions', () => {
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net"
    }).then(() => {
        if (session.info.isLoggedIn) {
            const {container} = render(<AboutUs/>);
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
        } else {
            fail();
        }
    });
});