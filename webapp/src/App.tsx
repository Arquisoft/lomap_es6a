import './App.css';
import Home from './components/home/home';
import Mapa from './components/mapa/form';
import MapaAmigo from './components/mapa/mapa';
import Amigos from './components/amigos/amigos';
import Nav from './components/fragments/nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/login'
import LoginForm from './components/Login/LoginForm'
import ProfileViewer from './components/Login/ProfileViewer'
import AboutUs from './components/aboutus/AboutUs';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';

function App(): JSX.Element {
  const { session } = useSession();
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
              <Route  path="/lomap_6a_despliegue/Mapa" element={<Mapa session={session} modo={true}/>}/>
              <Route  path="/lomap_6a_despliegue/MapaAmigo/:user" element={<MapaAmigo session={session}/>}/>
              <Route  path="/lomap_6a_despliegue/Amigos" element={<Amigos session={session}/>}/>
              <Route  path="/lomap_6a_despliegue/Aboutus" element={<AboutUs session={session}/>}/>
              <Route  path="/lomap_6a_despliegue/Login" element={<Login session={session}/>}/>
              <Route  path="/lomap_6a_despliegue/LoginForm" element={<LoginForm/>}/>
              <Route  path="/lomap_6a_despliegue/ProfileViewer" element={<ProfileViewer/>}/>
            </Routes>
            </div>
        </Router>
      </SessionProvider>
    </>
  );
}

export default App;