import renderer from "react-test-renderer";
import { Command } from ".";
import * as mut from "./contact";

// @ts-ignore
const contact: Command = mut.contact;

describe("contact", () => {
    test("contact returns a list of contacts", () => {
        const result = contact.callback([]);
        if (typeof result == "string") {
            fail("Expected result to not to be of type string");
        }

        const component = renderer.create(result);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
