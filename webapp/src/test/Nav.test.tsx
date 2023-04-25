import React from 'react';
import { render, screen, fireEvent,AllByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Session } from "@inrupt/solid-client-authn-browser";
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import Home from "../components/home/home";
import AboutUs from "../components/aboutus/AboutUs";
import Amigos from "../components/amigos/amigos";
import BuscarAmigo from "../components/amigos/buscarAmigo";
import MapaPrincipal from "../components/mapa/Principal-mapa";
import ProfileViewer from '../components/Login/ProfileViewer';
import nav from "../components/fragments/nav";


//We use home as a base to test the nav menu
test('Check if Login exists in the nav menu', () => {
    var login = render(<Login/>);
    login.findAllByLabelText("nav-Login").then((tmp) =>{
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