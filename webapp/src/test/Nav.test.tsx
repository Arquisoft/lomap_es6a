import React from 'react';
import { render, screen, fireEvent,AllByAttribute, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Session, getDefaultSession } from "@inrupt/solid-client-authn-browser";
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import Home from "../components/home/home";
import ProfileViewer from '../components/Login/ProfileViewer';
import nav from "../components/fragments/nav";
import { useSession } from "@inrupt/solid-ui-react";
import { Await } from 'react-router';
import App from '../App';
import { act } from 'react-dom/test-utils';
//import { Session } from "@inrupt/solid-client-authn-node";


//We use home as a base to test the nav menu
test('Check if login exists in the nav menu',  async () => {
    var home = render(<App/>);
    // act( () => home.findByLabelText("nav-Login").then((tmp) =>{
    //     expect(tmp).toBeInTheDocument();
    // }));
    //var tmp = await home.getByLabelText("nav-Login");
    //var tmp = await home.findByLabelText("nav-Login");
    //await expect(tmp).toBeInTheDocument();

    //  expect(home.findByLabelText("nav-Login").then((tmp) =>{
    //      expect(tmp).toBeInTheDocument();
    //  })).toBeInTheDocument();
    await home.findByLabelText("nav-Login").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    }).catch(() =>{ fail()}) ;
   
});
test('Check if Home exists in the nav menu',async () => {
    var home = render(<App/>);
    await home.findByLabelText("nav-Home").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    });
});

test('Check if redirect to login from home works', async () => {
    var home = render(<App/>);
    var loginNav =  home.findByLabelText("nav-Login")
    //expect(loginNav);
    await loginNav.then( tmp =>{ 
        expect(tmp).toBeInTheDocument();
        fireEvent.click(tmp)
        //expect(await home.findByLabelText("loginButton")).toBeInTheDocument()
         home.findByLabelText("loginButton").then((tmp) =>{
            expect(tmp).toBeInTheDocument();
        })
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
      oidcIssuer: "https://inrupt.net",
      //redirectUrl : "" ,
      redirectUrl: window.location.protocol + '//' + window.location.host + "/Home"
    }).then(() => {
      if (session.info.isLoggedIn) {
        // 3. Your session should now be logged in, and able to make authenticated requests.
       // session
        //console.log(`Logged in with WebID [${session.info.webId}]`);
        session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/Home");
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
        session.logout();
    });
})


//"https://pablofernandezdiaz.inrupt.net/profile/card#me"
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
        test("check if Amigos exists after loggin",() =>{
            var home = render(<Home/>);

            home.findAllByText("Amigos").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            home.findByLabelText("nav-Amigos").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        test("check if Mapa exists after loggin",() =>{
            var home = render(<Home/>);

            home.findAllByText("Mapa").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            home.findByLabelText("nav-Mapa").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        test("check if About us exists after loggin",() =>{
            var home = render(<Home/>);

            home.findAllByText("About us").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            home.findByLabelText("nav-AboutUs").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        session.logout();
      }
    });
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

afterAll( () => {
     getDefaultSession().logout();
});