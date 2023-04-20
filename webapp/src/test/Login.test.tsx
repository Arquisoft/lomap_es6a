import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import ProfileViewer from '../components/Login/ProfileViewer';
import { LoginButton} from "@inrupt/solid-ui-react";
// import { TextEncoder, TextDecoder } from 'util';
// import{ } from '@testing-library/jest-dom'
// Object.assign(global, { TextDecoder, TextEncoder });
//const Environment = require('jest-environment-jsdom');
// describe("Login", () => {
//     describe("LoginForm",() =>{
//     test('renders Login component without crashing', () => {
//         render(<LoginForm/>);
//     });})

// })
// module.exports = class CustomTestEnvironment extends Environment {
//   async setup() {
//       await super.setup();
//       if (typeof this.global.TextEncoder === 'undefined') {
//           const { TextEncoder } = require('util');
//           this.global.TextEncoder = TextEncoder;
//       }
//   }
// }

describe('LoginForm', () => {
    test('renderiza el formulario', () => {
      render(<LoginForm />);
    });
  });

