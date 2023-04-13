import { render, screen } from '@testing-library/react';
import Footer from "../components/fragments/Footer";

describe("Footer", () => {
    test('renders Footer component without crashing', () => {
        render(<Footer />);
    });

    test('contains the correct text', () => {
        render(<Footer />);
        const titleElement = screen.getByText('LoMap-es6a');
        expect(titleElement).toBeInTheDocument();
    });
})