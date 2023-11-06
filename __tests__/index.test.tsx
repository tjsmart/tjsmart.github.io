import { render } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Home", () => {
    it("Can render home", () => {
        render(<Home />);
    });
});
