import renderer from "react-test-renderer";
import { Command } from ".";
import * as mut from "./contact";

type Contact = {
    kind: string;
    username: string;
    href: string;
    icon: string;
};

// @ts-ignore
const contact: Command = mut.contact;
// @ts-ignore
const contacts: Contact[] = mut.contacts;

describe("contact", () => {
    test("contact snapshot", () => {
        const result = contact.callback([]);
        if (typeof result == "string") {
            fail("Expected result to not to be of type string");
        }

        const component = renderer.create(result);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("specific contacts opens href", () => {
        const mock_open = jest.fn();
        window.open = mock_open;

        contacts.forEach((c, index) => {
            contact.callback([c.kind]);
            expect(mock_open.mock.calls).toHaveLength(index + 1);
            expect(mock_open.mock.calls[index][0]).toStrictEqual(c.href);
        });
    });
});
