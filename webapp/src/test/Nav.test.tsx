import React from 'react';
import { render, screen, fireEvent,AllByAttribute, cleanup,waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Session, getDefaultSession,getClientAuthenticationWithDependencies, fetch } from "@inrupt/solid-client-authn-browser";
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import Home from "../components/home/home";
import ProfileViewer from '../components/Login/ProfileViewer';
import { LoginButton, SessionProvider } from "@inrupt/solid-ui-react";
import nav from "../components/fragments/nav";
import { useSession } from "@inrupt/solid-ui-react";
import { Await } from 'react-router';
//import { Router , MemoryRouter, Link } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import { act } from 'react-dom/test-utils';
import Nav from '../components/fragments/nav';
import { ClientRequest } from 'http';
import ClientAuthentication from '@inrupt/solid-client-authn-browser/dist/ClientAuthentication';
//import { Card, CardHeader, CardContent, Container, FormGroup, TextField, Button, Typography } from '@mui/material';
import { Button, Card, CardContent, CardHeader, Container, FormGroup, Link, TextField, Typography } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
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

// test('Check if redirect to login from home works', async  () => {
//     render(<Nav/>);

//     // seleccionar el enlace a Mapa
//     const mapaLink = screen.getByLabelText('nav-Login');

//     // simular un clic en el enlace
//     fireEvent.click(mapaLink);

//     // verificar que la página de Mapa se haya cargado correctamente
//     expect(screen.getByText('Identificate')).toBeInTheDocument();
// });
// test('Check if redirect to home from login works', () => {
//     var home = render(<Login/>);
//     var homeNav = home.findByLabelText("nav-Home")
//     //expect(homeNav);
//     homeNav.then(tmp =>{
//         expect(tmp).toBeInTheDocument();
//         fireEvent.click(tmp)
//         expect(screen.getByAltText('Slider')).toHaveAttribute('src',"fotohome14.png")
//     } )
//     //fireEvent.click(home.findByLabelText("nav-Login"))
// });

test('prueba login',()=>{
    
    const session = new Session();
    //getClientAuthenticationWithDependencies(session.).login({sessionId:"testASw"});
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
// jest.mock("@inrupt/solid-client-authn-browser", () => ({
//     getDefaultSessioncustom: () => ({
//             info: {
//                 isLoggedIn: "true",
//             },
//     })
// }));
jest.dontMock("@inrupt/solid-client-authn-browser")
jest.dontMock("@inrupt/solid-ui-react")
const getDefaultSessioncustom= () => ({
    info: {
        isLoggedIn: "true",
    },
})
//"https://pablofernandezdiaz.inrupt.net/profile/card#me"
describe("logedNav", ()=>{

    //const {session} = useSession()
    const session  = getDefaultSessioncustom()
    //session.info.isLoggedIn=true
    //render(<Nav session={session} />)
    //const session = new Session({clientAuthentication:getClientAuthenticationWithDependencies({})});
    //var a =  ClientAuthentication 
    //a.prototype.login({sessionId})
    // session.login({
    //   // 2. Use the authenticated credentials to log in the session.
    //   clientId: "https://testASW.inrupt.net/profile/card#me",
    //   clientSecret: "1234567890ABCabc.",
    //   oidcIssuer: "https://inrupt.net",
    //   //redirectUrl : "" ,
    //   redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",

    // })
    jest.setTimeout(20000) 
    var a = beforeAll(async ()=>{
       
        // render(  <>
        //     <form noValidate autoComplete="on">
        //         <Card >
        //           <CardHeader title="Identificate" />
        //           <CardContent>
        //             <Container fixed>
        //               <FormGroup>
        //                 <TextField
        //                   label="Identity Provider"
        //                   placeholder="Identity Provider"
        //                   type="url"
        //                   value={"https://inrupt.net"}
        //                   InputProps={{
        //                     endAdornment: (
        //                       <LoginButton  oidcIssuer={"https://inrupt.net"} redirectUrl={window.location.protocol + '//' + window.location.host + "/Home"}>
        //                         <Button variant="contained" color="primary" aria-label="loginButton">
        //                           Login
        //                         </Button>
        //                       </LoginButton>
        //                     ),
        //                   }} />
        //               </FormGroup>
        //               <Typography variant="body1" component="p" id="help">
        //                 <Link href="https://inrupt.net/register" margin={'20%'}> ¿No tienes una cuenta? Regístrate aqui</Link>
        //               </Typography>
        //             </Container>
        //           </CardContent>
        //         </Card>
        //       </form>
        //     </> )
    //    await waitFor(async ()=>{ await session.login({
    //         //2. Use the authenticated credentials to log in the session.
    //         clientId: "https://testasw.inrupt.net/profile/card#me",
    //         clientSecret: "1234567890ABCabc.",
    //         oidcIssuer: "https://inrupt.net",
    //         //redirectUrl : "" ,
    //         redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",
    
    //       }) },{timeout: 10000 ,interval: 9000})
        //  session.login({
        //     // 2. Use the authenticated credentials to log in the session.
        //     clientId: "https://testasw.inrupt.net/profile/card#me",
        //     clientSecret: "1234567890ABCabc.",
        //     oidcIssuer: "https://inrupt.net",
        //     //redirectUrl : "" ,
        //     redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",
    
        //   })
        // fireEvent.click(screen.getByLabelText(/loginbutton/i))

        //   fireEvent.change(screen.getByPlaceholderText("Username"),{
        //     target: {value: 'testASW'},
        //   });
        //   fireEvent.change(screen.getByPlaceholderText("Password"),{
        //     target: {value: '1234567890ABCabc.'},
        //   });
        //   fireEvent.click(screen.getByRole(/Log In/i))
    })
    
    // waitFor(async ()=>{ 
    //     await session.login({
    //     // 2. Use the authenticated credentials to log in the session.
    //     clientId: "https://testASW.inrupt.net/profile/card#me",
    //     clientSecret: "1234567890ABCabc.",
    //     oidcIssuer: "https://inrupt.net",
    //     //redirectUrl : "" ,
    //     redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",

    //   })},{timeout:10000 , onTimeout:()=>{fail()} } );


    if (!session.info.isLoggedIn) {
        fail();
      }
        // 3. Your session should now be logged in, and able to make authenticated requests.
       // session
       // console.log(`Logged in with WebID [${session.info.webId}]`);
       // session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/Home");
        test("check if Amigos exists after loggin", async () =>{
            // var home = render(		  
            //         <SessionProvider sessionId="log-in-example">
			//                 <Content isLoggedIn={true} />
		    //         </SessionProvider>);
            var nav = render( <BrowserRouter><Nav session={session}/></BrowserRouter> );

            // await home.findByText(/amigos/i).then((tmp) => (
            //     expect(tmp).toBeInTheDocument()
            // ));
              await nav.findByText("Amigos").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            await nav.findByLabelText("nav-Amigos").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        test("check if Mapa exists after loggin",async () =>{
            var nav = render( <BrowserRouter><Nav session={session}/></BrowserRouter> );

            await nav.findByText("Mapa").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            await nav.findByLabelText("nav-Mapa").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        test("check if About us exists after loggin",async () =>{
            var nav = render( <BrowserRouter><Nav session={session}/></BrowserRouter> );

            await nav.findByText("About us").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            await nav.findByLabelText("nav-AboutUs").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        test("check if Home us exists after loggin",async () =>{
            var nav = render( <BrowserRouter><Nav session={session}/></BrowserRouter> );

            await nav.findByText("Home").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            await nav.findByLabelText("nav-Home").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        test("check if Login us exists after loggin",async () =>{
            var nav = render( <BrowserRouter><Nav session={session}/></BrowserRouter> );

            await nav.findByText("Login").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));
            await nav.findByLabelText("nav-Login").then((tmp) => (
                expect(tmp).toBeInTheDocument()
            ));

        })
        //session.logout();
        
      //else
        
});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

// afterAll( () => {
//      getDefaultSession().logout();
// });


// //We use home as a base to test the nav menu
// test('Check if login exists in the nav menu',  async () => {
//     var home = render(<App/>);
//     // act( () => home.findByLabelText("nav-Login").then((tmp) =>{
//     //     expect(tmp).toBeInTheDocument();
//     // }));
//     //var tmp = await home.getByLabelText("nav-Login");
//     //var tmp = await home.findByLabelText("nav-Login");
//     //await expect(tmp).toBeInTheDocument();

//     //  expect(home.findByLabelText("nav-Login").then((tmp) =>{
//     //      expect(tmp).toBeInTheDocument();
//     //  })).toBeInTheDocument();
//     await home.findByLabelText("nav-Login").then((tmp) =>{
//         expect(tmp).toBeInTheDocument();
//     }).catch(() =>{ fail()}) ;

// });
// test('Check if Home exists in the nav menu',async () => {
//     var home = render(<App/>);
//     await home.findByLabelText("nav-Home").then((tmp) =>{
//         expect(tmp).toBeInTheDocument();
//     });
// });

// test('Check if redirect to login from home works', async () => {
//     var home = render(<App/>);
//     var loginNav =  home.findByLabelText("nav-Login")
//     //expect(loginNav);
//     await loginNav.then(  tmp =>{
//         expect(tmp).toBeInTheDocument();
//         fireEvent.click(tmp)
//         //expect(await screen.findByLabelText("loginButton")).toBeInTheDocument()

//     } )
//     await screen.findByLabelText("loginButton").then((tmp) =>{
//         expect(tmp).toBeInTheDocument();
//     })
//     //fireEvent.click(home.findByLabelText("nav-Login"))
// });
// test('Check if redirect to home from login works', () => {
//     var home = render(<Login/>);
//     var homeNav = home.findByLabelText("nav-Home")
//     //expect(homeNav);
//     homeNav.then(tmp =>{
//         expect(tmp).toBeInTheDocument();
//         fireEvent.click(tmp)
//         expect(screen.getByAltText('Slider')).toHaveAttribute('src',"fotohome14.png")
//     } )
//     //fireEvent.click(home.findByLabelText("nav-Login"))
// });

// test('prueba login',()=>{
//     const session = new Session();
//     session.login({
//       // 2. Use the authenticated credentials to log in the session.
//       clientId: "https://testASW.inrupt.net/profile/card#me",
//       clientSecret: "1234567890ABCabc.",
//       oidcIssuer: "https://inrupt.net",
//       //redirectUrl : "" ,
//       redirectUrl: window.location.protocol + '//' + window.location.host + "/Home"
//     }).then(() => {
//       if (session.info.isLoggedIn) {
//         // 3. Your session should now be logged in, and able to make authenticated requests.
//        // session
//         //console.log(`Logged in with WebID [${session.info.webId}]`);
//         session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/Home");
//         var home = render(<Home/>);

//         home.findAllByText("Amigos").then((tmp) => (
//             expect(tmp).toBeInTheDocument()
//         ));
//         home.findByLabelText("nav-Amigos").then((tmp) => (
//             expect(tmp).toBeInTheDocument()
//         ));

//         }
//         else
//             fail();
//         session.logout();
//     });
// })


// //"https://pablofernandezdiaz.inrupt.net/profile/card#me"
// describe("logedNav",()=>{
//     const session = new Session();
//     session.login({
//       // 2. Use the authenticated credentials to log in the session.
//       clientId: "https://testASW.inrupt.net/profile/card#me",
//       clientSecret: "1234567890ABCabc.",
//       oidcIssuer: "https://inrupt.net",
//       //redirectUrl : "" ,
//       redirectUrl: window.location.protocol + '//' + window.location.host + "/Home",

//     }).then(() => {
//       if (session.info.isLoggedIn) {
//         // 3. Your session should now be logged in, and able to make authenticated requests.
//        // session
//        // console.log(`Logged in with WebID [${session.info.webId}]`);
//         session.handleIncomingRedirect(window.location.protocol + '//' + window.location.host + "/Home");
//         test("check if Amigos exists after loggin",() =>{
//             var home = render(<Home/>);

//             home.findAllByText("Amigos").then((tmp) => (
//                 expect(tmp).toBeInTheDocument()
//             ));
//             home.findByLabelText("nav-Amigos").then((tmp) => (
//                 expect(tmp).toBeInTheDocument()
//             ));

//         })
//         test("check if Mapa exists after loggin",() =>{
//             var home = render(<Home/>);

//             home.findAllByText("Mapa").then((tmp) => (
//                 expect(tmp).toBeInTheDocument()
//             ));
//             home.findByLabelText("nav-Mapa").then((tmp) => (
//                 expect(tmp).toBeInTheDocument()
//             ));

//         })
//         test("check if About us exists after loggin",() =>{
//             var home = render(<Home/>);

//             home.findAllByText("About us").then((tmp) => (
//                 expect(tmp).toBeInTheDocument()
//             ));
//             home.findByLabelText("nav-AboutUs").then((tmp) => (
//                 expect(tmp).toBeInTheDocument()
//             ));

//         })
//         session.logout();
//       }
//     });
// });