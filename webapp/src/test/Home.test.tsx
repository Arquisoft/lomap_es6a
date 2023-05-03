import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Home from "../components/home/home";
import Slider from "../components/home/imgdinamicas";

jest.setTimeout(100000);

test('renders Home component without crashing', () => {
    render(<Home/>);
});

test('renders Slider component without crashing', () => {
    const images = ["fotohome1.png", "fotohome11.png", "fotohome12.png", "fotohome14.png", "fotohome5.png"];
    const delay = 10000;
    render(<Slider images={images} delay={delay}/>);
});

test('should render Slider with the first image', () => {
    const images = ["fotohome1.png", "fotohome11.png", "fotohome12.png", "fotohome14.png", "fotohome5.png"];
    const delay = 10000;
    const { getByAltText } = render(<Slider images={images} delay={delay} />);

    expect(getByAltText('Slider')).toHaveAttribute('src', images[0]);
});

test('should change the displayed image when clicking the next button', () => {
    const images = ["fotohome1.png", "fotohome11.png", "fotohome12.png", "fotohome14.png", "fotohome5.png"];
    const delay = 10000;
    const { getByAltText, getByLabelText } = render(<Slider images={images} delay={delay} />);

    fireEvent.click(getByLabelText('Next Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[1]);

    fireEvent.click(getByLabelText('Next Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[2]);

    fireEvent.click(getByLabelText('Next Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[3]);

    fireEvent.click(getByLabelText('Next Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[4]);
});

test('should change the displayed image when clicking the previous button', () => {
    const images = ["fotohome1.png", "fotohome11.png", "fotohome12.png", "fotohome14.png", "fotohome5.png"];
    const delay = 10000;
    const { getByAltText, getByLabelText } = render(<Slider images={images} delay={delay} />);

    fireEvent.click(getByLabelText('Next Image'));
    fireEvent.click(getByLabelText('Next Image'));
    fireEvent.click(getByLabelText('Next Image'));
    fireEvent.click(getByLabelText('Next Image'));

    fireEvent.click(getByLabelText('Previous Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[3]);

    fireEvent.click(getByLabelText('Previous Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[2]);

    fireEvent.click(getByLabelText('Previous Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[1]);

    fireEvent.click(getByLabelText('Previous Image'));
    expect(getByAltText('Slider')).toHaveAttribute('src', images[0]);
});
  
test('should loop back to the first image after the last one', () => {
    const images = ["fotohome1.png", "fotohome11.png", "fotohome12.png", "fotohome14.png", "fotohome5.png"];
    const delay = 10000;
    const { getByAltText, getByLabelText } = render(<Slider images={images} delay={delay} />);

    fireEvent.click(getByLabelText('Next Image'));
    fireEvent.click(getByLabelText('Next Image'));
    fireEvent.click(getByLabelText('Next Image'));
    fireEvent.click(getByLabelText('Next Image'));
    fireEvent.click(getByLabelText('Next Image'));

    expect(getByAltText('Slider')).toHaveAttribute('src', images[0]);
});

test('should go to the last image after the first', () => {
    const images = ["fotohome1.png", "fotohome11.png", "fotohome12.png", "fotohome14.png", "fotohome5.png"];
    const delay = 10000;
    const { getByAltText, getByLabelText } = render(<Slider images={images} delay={delay} />);

    fireEvent.click(getByLabelText('Previous Image'));

    expect(getByAltText('Slider')).toHaveAttribute('src', images[-1]);
});

test('should go to the next image after delay', async () => {
    const images = ["fotohome1.png", "fotohome11.png", "fotohome12.png", "fotohome14.png", "fotohome5.png"];
    const delay = 10000;
    const { getByAltText, getByLabelText } = render(<Slider images={images} delay={delay} />);

    await waitFor(() => {
        expect(getByAltText('Slider')).toHaveAttribute('src', images[1]);
    }, { timeout: 10000 });
});