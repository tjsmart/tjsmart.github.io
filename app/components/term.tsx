"use client"; // required by useState
import { useEffect, useRef, useState } from "react";
import { handleCommand } from "./commands";
import { History, HistoryItem } from "./history";
import { Prompt } from "./prompt";
import { UserInput } from "./user_input";

export function Term() {
    const [history, setHistory] = useState(new Array<HistoryItem>());
    const [submittedCommand, setSubmittedCommand] = useState<string | null>(
        "welcome",
    );

    const userInputRef = useRef<HTMLDivElement>(null);

    if (submittedCommand) {
        if (submittedCommand.trim() === "clear") {
            // TODO: I'd prefer clear not to actually wipe out the history but
            // this is a dead simple implementation and a true clear behavior
            // will likely be a good deal of work.
            setHistory([]);
        } else {
            setHistory([
                ...history,
                {
                    command: submittedCommand,
                    output: handleCommand(submittedCommand),
                },
            ]);
        }
        setSubmittedCommand(null);
    }

    useEffect(() => userInputRef.current?.scrollIntoView());

    return (
        <div className="h-fill m-2">
            <label>
                <History history={history} />
                <div className="flex flex-row" ref={userInputRef}>
                    <Prompt />
                    <UserInput
                        setSubmittedCommand={setSubmittedCommand}
                        history={history}
                    />
                </div>
            </label>
        </div>
    );
}
