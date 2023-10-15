import { render, screen } from "@testing-library/react";
import { Term } from "./term";
import "@testing-library/jest-dom";

describe("Term", () => {
    it("can render Term", () => {
        render(<Term />);
    });
});
