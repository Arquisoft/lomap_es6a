import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import ProfileViewer from '../components/Login/ProfileViewer';

// describe("Login", () => {
//     describe("LoginForm",() =>{
//     test('renders Login component without crashing', () => {
//         render(<LoginForm/>);
//     });})

// })
describe('LoginForm', () => {
    test('renderiza el formulario', () => {
      render(<LoginForm />);
    });
  });

