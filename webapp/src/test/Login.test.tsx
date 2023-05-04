import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Session } from "@inrupt/solid-client-authn-browser";
import Login from '../components/Login/login';

jest.setTimeout(100000000);

const session = new Session();
session.info.isLoggedIn = true;

test('renders Login component without log in', () => {
  render(<Login session={new Session()}/>);

  expect(screen.getByText(/Identificate/i)).toBeInTheDocument();
  expect(screen.getByLabelText('Identity Provider')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Identity Provider')).toBeInTheDocument();
  expect(screen.getByDisplayValue('https://inrupt.net')).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText('¿No tienes una cuenta? Regístrate aqui')).toBeInTheDocument();
  expect(screen.getByText('¿No tienes una cuenta? Regístrate aqui')).toHaveAttribute('href', 'https://inrupt.net/register');
});

test('renders Login component with log in without webId', () => {
  render(<Login session={session} />);
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test('renders Login component with log in with webId', async () => {
  session.info.webId = "https://testasw.inrupt.net/profile/card#me";
  render(<Login session={session} />);

  expect(screen.getByText(/Logout/i)).toBeInTheDocument();

  // await waitFor(() => {
  //   expect(screen.getByText(/User/i)).toBeInTheDocument();
  //   expect(screen.getByText(/testASW/i)).toBeInTheDocument();
  // }, { timeout: 10000 });
  
  setTimeout(() => {
    expect(screen.getByText(/User/i)).toBeInTheDocument();
    expect(screen.getByText(/testASW/i)).toBeInTheDocument();
  }, 5000);
});