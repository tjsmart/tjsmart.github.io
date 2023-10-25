import renderer from "react-test-renderer";
import { Command } from ".";
import * as mut from "./welcome";

// @ts-ignore
const welcome: Command = mut.welcome;

describe("welcome", () => {
    test("welcome snapshot", () => {
        const result = welcome.callback([]);
        if (typeof result == "string") {
            fail("Expected result to not to be of type string");
        }

        const component = renderer.create(result);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
