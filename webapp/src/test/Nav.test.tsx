import React from 'react';
import { render, screen, fireEvent,AllByAttribute } from '@testing-library/react';
import { Session, getDefaultSession } from "@inrupt/solid-client-authn-browser";
import Home from "../components/home/home";


//We use home as a base to test the nav menu
test('Check if Login exists in the nav menu', () => {
    var home = render(<Home/>);
    home.findAllByLabelText("nav-Login").then((tmp) =>{
        expect(tmp).toBeInTheDocument();
    });
});

test('Check if Home exists in the nav menu', () => {
    var home = render(<Home/>);
    home.findAllByLabelText("nav-Home").then((tmp) =>{
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
    var home = render(<Home/>);
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
        session.logout();
      }
    });
});


afterAll(async () => {
    await getDefaultSession().logout();
});