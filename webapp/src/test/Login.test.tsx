import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/Login/login';
import LoginForm from '../components/Login/LoginForm';
import ProfileViewer from '../components/Login/ProfileViewer';

describe("Login", () => {
    test('renders Login component without crashing', () => {
        render(<Login />);
    });
})

describe("LoginForm", () => {
    test('renders LoginForm component without crashing', () => {
        render(<LoginForm />);
    });
})

describe("ProfileViewer", () => {
    test('renders ProfileViewer component without crashing', () => {
        render(<ProfileViewer />);
    });
})
