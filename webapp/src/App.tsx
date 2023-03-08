import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';
import Footer from './components/fragments/Footer';
import Home from './components/home/home';
import Mapa from './components/mapa/Principal-mapa';
import Amigos from './components/amigos/amigos';
import Nav from './components/fragments/nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/login'
import AboutUs from './components/aboutus/AboutUs';

function App(): JSX.Element {;

  return (
    <>
      <div className='contenedor-principal'>
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
          </Routes>
          </div>
        <div className='contenedor-footer'>
        <Footer/>
        </div>
      </Router>
      </div>
    </>
  );
}

export default App;
