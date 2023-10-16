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
        expect(handleCommand("test_cmd")).toEqual("test command!");
        expect(handleCommand("test_cmd foo bar baz")).toEqual(
            "test command!foo bar baz",
        );
    });

    test("handle unknown command output", () => {
        expect(handleCommand("i_am_unknown")).toEqual(
            "command not found: i_am_unknown",
        );
        expect(handleCommand("fooey bar")).toEqual("command not found: fooey");
    });

    test("handle command with extra whitespace", () => {
        expect(handleCommand("   test_cmd  ")).toEqual(test_cmd.callback([]));
    });

    test("cannot register a command twice", () => {
        expect(() => registerCommand(test_cmd)).toThrowError();
    });

    test("help without argument displays available commands", () => {
        const output = help.callback([]);
        expect(output.startsWith("Available Commands")).toBe(true);
        expect(output.includes("test_cmd")).toBe(true);
    });

    test("help with valid command, shows help on that command", () => {
        const output = help.callback(["test_cmd"]);

        expect(output.startsWith("Help on `test_cmd`")).toBe(true);
        expect(output.includes("Just a test command.")).toBe(true);
    });

    test("help with two arguments throws", () => {
        let output = help.callback(["arg1", "arg2"]);
        expect(output.startsWith("Too many arg")).toBe(true);
    });

    test("help on command without a description", () => {
        test_cmd.description = null;
        let output = help.callback(["test_cmd"]);
        expect(output.startsWith("no help found")).toBe(true);
        expect(output.includes("test_cmd")).toBe(true);
    });
});
