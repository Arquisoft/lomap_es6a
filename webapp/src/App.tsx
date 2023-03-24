import './App.css';
import Footer from './components/fragments/Footer';
import Home from './components/home/home';
import Mapa from './components/mapa/Principal-mapa';
import Amigos from './components/amigos/amigos';
import Nav from './components/fragments/nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import LoginForm from './components/Login/LoginForm'
import ProfileViewer from './components/Login/ProfileViewer'
import AboutUs from './components/aboutus/AboutUs';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { useState } from 'react';
import LoginUsrPsswd from './components/Login/LoginUsrPsswd';

function App(): JSX.Element {
  //localStorage.clear();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <div className='contenedor-principal'>
      <SessionProvider sessionId="logIn">
        <Router>
          <div className='contenedor-navegacion'>
          <Nav/>
          </div>
            <div className='contenedor-rutas'>
            <Routes>
              <Route  path={"/"} element={<Home/>} />
              <Route  path="/Mapa" element={<Mapa/>}/>
              <Route  path="/Amigos" element={<Amigos/>}/>
              <Route  path="/Aboutus" element={<AboutUs/>}/>
              <Route  path="/Login" element={<Login/>}/>
              <Route  path="/LoginForm" element={<LoginForm/>}/>
              <Route  path="/ProfileViewer" element={<ProfileViewer/>}/>
              <Route  path="/LoginUsrPsswd" element={<LoginUsrPsswd/>}/>
            </Routes>
            </div>
          <div className='contenedor-footer'>
            <Footer/>
          </div>
        </Router>
      </SessionProvider>
      </div>
    </>
  );
}

export default App;
