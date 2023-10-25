import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HistoryItem } from "./history";

type InputProps = {
    setSubmittedCommand: (command: string | null) => void;
    history: HistoryItem[];
};

export function UserInput({ setSubmittedCommand, history }: InputProps) {
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
            className="bg-transparent outline-none grow"
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
