"use client"; // required by useState
import { ChangeEvent, useEffect, useRef, useState } from "react";

type HistoryItem = {
    command: string;
    output: string;
};

type CommandHandler = (command: string) => string;

const commandMap = new Map<string, CommandHandler>();

export function registerCommand(command: string, handler: CommandHandler) {
    commandMap.set(command, handler);
}

registerCommand("hello", () => "Hi 👋");
registerCommand("avail", () => Array.from(commandMap.keys()).join("\n"));

function handleCommand(command: string): string {
    // TODO: parse command from args...
    const handler = commandMap.get(command);
    if (!handler) {
        return `command not found: ${command}`;
    }

    return handler(command);
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
                <UserInput setSubmittedCommand={setSubmittedCommand} />
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
};

function UserInput({ setSubmittedCommand }: InputProps) {
    // TODO: checking if there is already a submitted command may be important...
    let [command, setCommand] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowUp": {
                e.preventDefault();
                setCommand("foo");
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                setCommand("bar");
                break;
            }
            case "Enter": {
                e.preventDefault();
                setSubmittedCommand(command);
                setCommand("");
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
