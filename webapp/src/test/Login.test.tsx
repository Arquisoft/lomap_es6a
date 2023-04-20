import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
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
test('renderiza el formulario', () => {
  render(<LoginForm />);
});
test('renderiza el formulario y hace click en login', () => {
         const{getByLabelText,getByRole,getByText,getAllByRole} =render(<LoginForm />);
         //fireEvent.click(getByText('loginButton',{r}));
         //fireEvent.click(getByLabelText('loginButton'));
         var temp = getAllByRole('button');
         //fireEvent.click(getAllByRole('button')[1]);
         
       });
// describe('LoginForm', () => {
//     test('renderiza el formulario', () => {
//       const{getByLabelText,getByRole} =render(<LoginForm />);
//       fireEvent.click(getByLabelText('loginButton'));
//       //fireEvent.click(getByRole('button'));
//       //
//     });
//     // test('renderiza el perfil', () => {
//     //   render(<ProfileViewer />);
//     // });
//   });

