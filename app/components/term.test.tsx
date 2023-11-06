import { render } from "@testing-library/react";
import { Term } from "./term";
import "@testing-library/jest-dom";

// mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Term", () => {
    it("can render Term", () => {
        render(<Term />);
    });
});
