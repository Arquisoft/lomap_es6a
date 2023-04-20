import { render } from '@testing-library/react';
import Home from "../components/home/home";
import Slider from "../components/home/imgdinamicas";

describe("Home", () => {
    test('renders Home component without crashing', () => {
        render(<Home />);
    });
})

describe("Slider", () => {
    test("renders Slider component without crashing", () => {
        const images = ["image1", "image2", "image3"];
        const delay = 10000;
        render(<Slider images={images} delay={delay} />);
    });
});