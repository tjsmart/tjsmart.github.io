import { Command } from "./factory";
import * as mut from "./hello";

type Greeting = {
    language: string;
    greeting: string;
    pronunciation: string;
};

// @ts-ignore
const hello: Command = mut.hello;
// @ts-ignore
const greetings: Greeting[] = mut.greetings;

describe("hello", () => {
    test("hello returns a random greeting", () => {
        let outputs = new Set<string>();

        for (let i = 0; i < 20; i++) {
            let output = hello.callback([]);
            outputs.add(output);

            expect(
                greetings.some((value) => output.includes(value.language)),
            ).toBe(true);

            expect(
                greetings.some((value) => output.includes(value.greeting)),
            ).toBe(true);

            expect(
                greetings.some((value) => output.includes(value.pronunciation)),
            ).toBe(true);
        }

        // This can fail 1 in 76,095,835,016 (assuming.greetings.length == 14)
        expect(outputs.size).toBeGreaterThan(4);
    });
});
