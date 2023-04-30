import { Session, getDefaultSession } from "@inrupt/solid-client-authn-browser";
import Amigos from '../components/amigos/amigos';
import { render, screen } from '@testing-library/react';
import { Navigate } from 'react-router-dom';
import Home from "../components/home/home";
import { MemoryRouter } from 'react-router-dom';

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

describe('Amigos', () => {
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
      session.logout();
      session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/amigos");
      test("comprueba que redirige a /login", async () => {
        render(<Amigos/>);
        expect(screen.findByLabelText("loginButton")).toBeInTheDocument()
      })
    }
    else
      fail();
  });      

});
