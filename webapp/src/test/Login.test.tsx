import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Session } from "@inrupt/solid-client-authn-browser";
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import ProfileViewer from '../components/Login/ProfileViewer';

test('renders LoginForm component without crashing', () => {
    render(<LoginForm />);
});

test('LoginForm contains the correct text', () => {
  render(<LoginForm />);
  expect(screen.getByText(/Identificate/i)).toBeInTheDocument();
});

test('LoginForm renders Identity Provider input field correctly', () => {
  render(<LoginForm />);
  expect(screen.getByLabelText('Identity Provider')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Identity Provider')).toBeInTheDocument();
  expect(screen.getByDisplayValue('https://inrupt.net')).toBeInTheDocument();
});

test('LoginForm renders Login button correctly', () => {
  render(<LoginForm />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('LoginForm renders registration link correctly', () => {
  render(<LoginForm />);
  const registrationLink = screen.getByText('¿No tienes una cuenta? Regístrate aqui');
  expect(registrationLink).toBeInTheDocument();
  expect(registrationLink).toHaveAttribute('href', 'https://inrupt.net/register');
});