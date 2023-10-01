"use client"; // required by useState
import { ChangeEvent, useState } from "react";

export function Term() {
    let [history, setHistory] = useState(new Array());
    const addHistory = (item: string) => setHistory([...history, item]);
    return (
        <div className="h-1 m-3">
            <label>
                <History history={history} />
                <UserInput addHistory={addHistory} />
            </label>
        </div>
    );
}

function Prompt() {
    return "earthling@tjsmart.github.io:~$ ";
}

type HistoryProps = {
    history: string[];
};

function History({ history }: HistoryProps) {
    return (
        <div>
            {history.map((command: string) => (
                // added key here to avoid eslint, don't know what it do
                <div key={command}>
                    <Prompt />
                    <text>{command}</text>
                    <br />
                </div>
            ))}
        </div>
    );
}

type InputProps = {
    addHistory: (command: string) => void;
};

function UserInput({ addHistory }: InputProps) {
    let [command, setCommand] = useState("");

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
                addHistory(command);
                setCommand("");
                break;
            }
        }
    };

    return (
        <div>
            <Prompt />
            <input
                name="CommandInput"
                className="bg-transparent outline-none"
                value={command}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus={true}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
            />
        </div>
    );
}
