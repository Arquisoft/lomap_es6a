import React from 'react';
import { render, screen, fireEvent,AllByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import { Session } from "@inrupt/solid-client-authn-browser";
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import Home from "../components/home/home";
import AboutUs from "../components/aboutus/AboutUs";
import Amigos from "../components/amigos/amigos";
import BuscarAmigo from "../components/amigos/buscarAmigo";
import MapaPrincipal from "../components/mapa/Principal-mapa";
import ProfileViewer from '../components/Login/ProfileViewer';
import nav from "../components/fragments/nav";
import { useSession } from "@inrupt/solid-ui-react";
import { Session } from "@inrupt/solid-client-authn-node";


//We use home as a base to test the nav menu
<<<<<<< HEAD
test('Check if Login exists in the nav menu', () => {
    var login = render(<Login/>);
    login.findAllByLabelText("nav-Login").then((tmp) =>{
=======
test('Check if login exists in the nav menu', () => {
    var home = render(<Home/>);
    
    home.findAllByLabelText("nav-Login").then((tmp) =>{
>>>>>>> ee6c7275d1119776e4e8d3483e8234517975885d
        expect(tmp).toBeInTheDocument();
    });
});
test('Check if Home exists in the nav menu', () => {
    var home = render(<Home/>);
    home.findAllByLabelText("nav-Home").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    });
});
test('Check if AboutUs exists in the nav menu', () => {
    var aboutUs = render(<AboutUs/>);
    aboutUs.findAllByLabelText("nav-AboutUs").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    });
});

test('Check if redirect to login from home works', () => {
    var home = render(<Home/>);
    var loginNav = home.findByLabelText("nav-Login")
    // expect(loginNav);
    loginNav.then(tmp =>{ 
        expect(tmp).toBeInTheDocument();
        fireEvent.click(tmp)
        expect(screen.findByLabelText("loginButton")).toBeInTheDocument()
    } )
    //fireEvent.click(home.findByLabelText("nav-Login"))
});
test('Check if redirect to home from login works', () => {
    var home = render(<Login/>);
    var homeNav = home.findByLabelText("nav-Home")
    //expect(homeNav);
    homeNav.then(tmp =>{
        expect(tmp).toBeInTheDocument(); 
        fireEvent.click(tmp)
        expect(screen.getByAltText('Slider')).toHaveAttribute('src',"fotohome14.png")
    } )
    //fireEvent.click(home.findByLabelText("nav-Login"))
});

test('prueba login',()=>{
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net"
    }).then(() => {
      if (session.info.isLoggedIn) {
        // 3. Your session should now be logged in, and able to make authenticated requests.
        session
        console.log(`Logged in with WebID [${session.info.webId}]`);

        var home = render(<Home/>);

        home.findAllByText("Amigos").then((tmp) => (
            expect(tmp).toBeInTheDocument()
        ));
        home.findByLabelText("nav-Amigos").then((tmp) => (
            expect(tmp).toBeInTheDocument()
        ));

        }
        else
            fail();
    });
})


//"https://pablofernandezdiaz.inrupt.net/profile/card#me"
describe("logedNav",()=>{
    const session = new Session();
    session.login({
      // 2. Use the authenticated credentials to log in the session.
      clientId: "https://testASW.inrupt.net/profile/card#me",
      clientSecret: "1234567890ABCabc.",
      oidcIssuer: "https://inrupt.net"
    }).then(() => {
      if (session.info.isLoggedIn) {
        // 3. Your session should now be logged in, and able to make authenticated requests.
        session
        console.log(`Logged in with WebID [${session.info.webId}]`);

        test("check if Amigos exists after loggin",() =>{
            var home = render(<Home/>);

            home.findAllByText("Amigos").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            home.findByLabelText("nav-Amigos").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        session.info.isLoggedIn = false;
      }
    });
});