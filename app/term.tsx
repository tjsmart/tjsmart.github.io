"use client"; // required by useState
import { ChangeEvent, useEffect, useRef, useState } from "react";

type HistoryItem = {
    command: string;
    output: string;
};

type CommandCallback = (args: string[]) => string;

class Command {
    public name: string;
    public callback: CommandCallback;
    public description: string | null = null;

    public constructor(
        name: string,
        callback: CommandCallback,
        description: string | null = null,
    ) {
        this.name = name;
        this.callback = callback;
        this.description = description;
    }
}

const commandMap = new Map<string, Command>();

export function registerCommand(command: Command) {
    commandMap.set(command.name, command);
}

registerCommand(
    new Command(
        "hello",
        // TODO: accept a parameter/argument for which language
        () => {
            let greeting = get_greeting();
            return `${greeting.greeting} (${greeting.language}, ${greeting.pronunciation})`;
        },
        // TODO: list languages here
        // TODO: these should really include options... perhaps argument parsing should be done by command...
        "I'll say hi back in a random language 😜",
    ),
);
registerCommand(
    new Command(
        "what",
        () => Array.from(commandMap.keys()).join("\n"),
        "Lists what commands are available",
    ),
);
registerCommand(
    new Command(
        "help",
        (args: string[]): string => {
            if (args.length == 0) {
                // TODO: error
                return "Provide a command to learn about.";
            }
            if (args.length > 1) {
                // TODO: error
                return "Too many arguments";
            }
            let command = commandMap.get(args[0]);
            if (!command) {
                // TODO: error
                return `command not found: ${args[0]}`;
            }
            if (!command.description) {
                // TODO: error
                return `no help found for: ${command.name}`;
            }
            // TODO: formatting?
            // TODO: should length of line be the length of 'Help on command.name'? Or maybe length of screen?
            return `Help on \`${command.name}\`\n--------------------------------------------------------------------------------\n${command.description}`;
        },
        "Display help on the provided command, e.g. `help what`",
    ),
);

function handleCommand(commandLine: string): string {
    // TODO: better parsing...
    let [name, ...args] = commandLine.split(" ");

    const command = commandMap.get(name);
    if (!command) {
        return `command not found: ${name}`;
    }

    return command.callback(args);
}

export function Term() {
    let [history, setHistory] = useState(new Array<HistoryItem>());
    let [submittedCommand, setSubmittedCommand] = useState<string | null>(null);

    if (submittedCommand) {
        setHistory([
            ...history,
            {
                command: submittedCommand,
                output: handleCommand(submittedCommand),
            },
        ]);
        setSubmittedCommand(null);
    }

    return (
        <div className="h-1 m-3 font-mono">
            <label>
                <History history={history} />
                <Prompt />
                <UserInput
                    setSubmittedCommand={setSubmittedCommand}
                    history={history}
                />
            </label>
        </div>
    );
}

function Prompt() {
    return (
        <span>
            <span className="text-green-500">earthling@tjsmart.github.io</span>
            {" > "}
        </span>
    );
}

type HistoryProps = {
    history: HistoryItem[];
};

function History({ history }: HistoryProps) {
    return (
        <div>
            {history.map((item: HistoryItem, index: number) => (
                // added key here to avoid eslint, don't know what it do
                <div key={`history-${index}`}>
                    <Prompt />
                    {item.command}
                    <br />
                    {/*
                        TODO: this implementation assumes the output is a string
                        need to expand this to allow users to produce jsx?
                    */}
                    {item.output &&
                        item.output.split("\n").map((line: string) => (
                            <>
                                {line}

                                <br />
                            </>
                        ))}
                </div>
            ))}
        </div>
    );
}

type InputProps = {
    setSubmittedCommand: (command: string | null) => void;
    history: HistoryItem[];
};

function UserInput({ setSubmittedCommand, history }: InputProps) {
    // TODO: checking if there is already a submitted command may be important...
    let [command, setCommand] = useState("");
    // store off a comand when user starts scrolling history of commands
    let [storedCommand, setStoredCommand] = useState("");
    let [idx, setIdx] = useState(history.length - 1);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                let prev;
                while (
                    (prev = history[idx - 1]) &&
                    prev &&
                    prev.command == command
                ) {
                    idx -= 1;
                    setIdx(idx);
                    continue;
                }
                if (!prev) {
                    break;
                }
                if (idx == history.length) {
                    setStoredCommand(command);
                }
                setCommand(prev.command);
                setIdx(idx - 1);
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                let next;
                while (
                    (next = history[idx + 1]) &&
                    next &&
                    next.command == command
                ) {
                    idx += 1;
                    setIdx(idx);
                    continue;
                }
                if (!next) {
                    setCommand(storedCommand);
                    setIdx(history.length);
                    break;
                }

                setCommand(next.command);
                setIdx(idx + 1);
                break;
            }
            case "Enter": {
                e.preventDefault();
                setSubmittedCommand(command);
                setCommand("");
                setIdx(history.length + 1);
                break;
            }
        }
    };

    const handleParentNodeKeyDown = (e: any) => {
        if (
            (e.key == "Enter" || e.key == "Escape") &&
            inputRef.current != document.activeElement
        ) {
            inputRef.current && inputRef.current.focus();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleParentNodeKeyDown);
        return () => {
            document.removeEventListener("keydown", handleParentNodeKeyDown);
        };
        // TODO: is parentNode correct here? Want to limit this behavior somehow...
    }, [inputRef.current?.parentNode]);

    return (
        <input
            name="CommandInput"
            className="bg-transparent outline-none"
            ref={inputRef}
            value={command}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus={true}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
        />
    );
}

// Begin hello data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type Greeting = {
    language: string;
    greeting: string;
    pronunciation: string;
};

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function get_greeting(): Greeting {
    let idx = getRandomInt(greetings.length);
    return greetings[idx];
}

const greetings: Greeting[] = [
    { language: "Spanish", greeting: "hola", pronunciation: "OH-la" },
    { language: "French", greeting: "bonjour", pronunciation: "bon-ZHOOR" },
    {
        language: "German",
        greeting: "guten Tag",
        pronunciation: "GOO-tehn tahk",
    },
    { language: "Italian", greeting: "salve", pronunciation: "SAL-vay" },
    {
        language: "Mandarin",
        greeting: "您好",
        pronunciation: "NEEN-haow",
    },
    {
        language: "Arabic",
        greeting: "السلام عليكم",
        pronunciation: "as-sah-lahm-u lay-kuhm",
    },
    {
        language: "Japanese",
        greeting: "こんにちは",
        pronunciation: "kohn-nee-chee-wah",
    },
    {
        language: "Korean",
        greeting: "안녕하세요",
        pronunciation: "AHN-young-ha-say-yo",
    },
    { language: "Portuguese", greeting: "olá", pronunciation: "oh-LA" },
    {
        language: "Hindi",
        greeting: "नमस्ते",
        pronunciation: "nuhm-uh-stay",
    },
    {
        language: "Russian",
        greeting: "здравствуйте",
        pronunciation: "za-DRAH-stvooy-tee",
    },
    { language: "Turkish", greeting: "merhaba", pronunciation: "mehr-hah-bah" },
    {
        language: "Vietnamese",
        greeting: "xin chào",
        pronunciation: "sin jow",
    },
    {
        language: "Farsi (Persian)",
        greeting: "سَلام",
        pronunciation: "sah-lahm",
    },
    {
        language: "Polish",
        greeting: "dzień dobry",
        pronunciation: "jayn doh-brih",
    },
];
// End hello data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
