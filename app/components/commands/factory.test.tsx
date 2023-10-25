import renderer from "react-test-renderer";
import { registerCommand, handleCommand, Command } from "./factory";
import * as factory from "./factory";

// @ts-ignore
const help: Command = factory.help;

const test_cmd = new Command(
    "test_cmd",
    (args: string[]) => `test command!${args.join(" ")}`,
    "Just a test command.",
);

let storedCommandMap: Map<string, Command>;

beforeEach(() => {
    // @ts-ignore
    storedCommandMap = factory.commandMap;
    // @ts-ignore
    factory.commandMap.clear();
    registerCommand(test_cmd);
});
// TODO: set commandMap state back
// afterAll(() => {
//     // @ts-ignore
//     factory.commandMap = storedCommandMap;
// });

describe("factory", () => {
    test("registered command executes expected callback", () => {
        let result = handleCommand("test_cmd");
        let tree = renderer.create(result).toJSON();
        expect(tree).toMatchSnapshot();

        result = handleCommand("test_cmd foo bar baz");
        tree = renderer.create(result).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("handle unknown command output", () => {
        const result = handleCommand("i_am_unknown");
        const tree = renderer.create(result).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("handle command with extra whitespace", () => {
        const getJSON = (cmd: string) =>
            renderer.create(handleCommand(cmd)).toJSON();

        const actual = getJSON("   test_cmd   ");
        const expected = getJSON("test_cmd");

        expect(actual).toEqual(expected);
    });

    test("cannot register a command twice", () => {
        expect(() => registerCommand(test_cmd)).toThrowError();
    });

    test("help without argument displays available commands", () => {
        const output = help.callback([]);

        if (typeof output != "string") {
            fail("Expected output to be of type string");
        }

        expect(output.startsWith("Available Commands")).toBe(true);
        expect(output.includes("test_cmd")).toBe(true);
    });

    test("help with valid command, shows help on that command", () => {
        const output = help.callback(["test_cmd"]);

        if (typeof output != "string") {
            fail("Expected output to be of type string");
        }

        expect(output.startsWith("Help on `test_cmd`")).toBe(true);
        expect(output.includes("Just a test command.")).toBe(true);
    });

    test("help with two arguments throws", () => {
        let output = help.callback(["arg1", "arg2"]);

        if (typeof output != "string") {
            fail("Expected output to be of type string");
        }

        expect(output.startsWith("Too many arg")).toBe(true);
    });

    test("help on command without a description", () => {
        test_cmd.description = null;
        let output = help.callback(["test_cmd"]);

        if (typeof output != "string") {
            fail("Expected output to be of type string");
        }

        expect(output.startsWith("no help found")).toBe(true);
        expect(output.includes("test_cmd")).toBe(true);
    });
});
