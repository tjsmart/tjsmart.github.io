import renderer from "react-test-renderer";
import { Command } from ".";
import * as mut from "./about";

// @ts-ignore
const about: Command = mut.about;

describe("about", () => {
    test("about snapshot", () => {
        const result = about.callback([]);
        if (typeof result == "string") {
            fail("Expected result to not to be of type string");
        }

        const component = renderer.create(result);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
