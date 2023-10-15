import { render } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
    it("Can render home", () => {
        render(<Home />);
    });
});
