import React from "react";
import { render, screen } from '@testing-library/react';
import Footer from "../components/fragments/Footer";

test('renders Footer component without crashing', () => {
    render(<Footer/>);
});

test('Footer contains the correct text', () => {
    render(<Footer/>);
    expect(screen.queryByText(/LoMap-es6a/i)).toBeInTheDocument();
});