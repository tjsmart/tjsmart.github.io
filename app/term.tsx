"use client"; // required by useState
import { ChangeEvent, useEffect, useRef, useState } from "react";

export function Term() {
    let [history, setHistory] = useState(new Array());
    const addHistory = (item: string) => setHistory([...history, item]);
    return (
        <div className="h-1 m-3 font-mono">
            <label>
                <History history={history} />
                <Prompt />
                <UserInput addHistory={addHistory} />
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
                addHistory(command);
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
