import './App.css';
import Footer from './components/fragments/Footer';
import Home from './components/home/home';
import Mapa from './components/mapa/Principal-mapa';
import MapaAmigo from './components/mapa/mapa';
import Amigos from './components/amigos/amigos';
import Nav from './components/fragments/nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/login'
import LoginForm from './components/Login/LoginForm'
import ProfileViewer from './components/Login/ProfileViewer'
import AboutUs from './components/aboutus/AboutUs';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';
import { useState, useEffect } from 'react';
import { Session,  ISessionOptions, ILoginInputOptions} from "@inrupt/solid-client-authn-browser";
import { handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
//import * as loginManager  from "./components/Login/LoginManager";
//let loginManager = require("./components/Login/LoginManager.ts");

// function Test(){
//   const { session } = useSession();
//   return <Nav session={session} />
// }

function App(): JSX.Element {
  //const { session } = useSession();
  const { session } = useSession();
   const [ses, setSes] = useState(new Session);
  var temp = useSession().session;


  //var temp = useSession().session;

  //if (loginManager.getUserSession() != null)
  //    temp = loginManager.getUserSession()
  //const session = temp;
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  // useEffect(() => {
  //   handleIncomingRedirect();
  // }, []);
  //Nav({session}
  return (
<>
      <SessionProvider sessionId="logIn">
        <Router>
          <div className='contenedor-navegacion'>
            <Nav/>
          </div>
            <div className='contenedor-rutas'>
            <Routes>
              <Route  path={"/"} element={<Home/>} />
              <Route  path="/Mapa" element={<Mapa session={session}/>}/>
              <Route  path="/MapaAmigo/:user" element={<MapaAmigo session={session}/>}/>
              <Route  path="/Amigos" element={<Amigos/>}/>
              <Route  path="/Aboutus" element={<AboutUs/>}/>
              <Route  path="/Login" element={<Login/>}/>
              <Route  path="/LoginForm" element={<LoginForm/>}/>
              <Route  path="/ProfileViewer" element={<ProfileViewer/>}/>
            </Routes>
            </div>
        </Router>
      </SessionProvider>
    </>
  );
}

export default App;