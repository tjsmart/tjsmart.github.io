"use client"; // required by useState
import { useState } from "react";
import { handleCommand } from "./commands";
import { History, HistoryItem } from "./history";
import { Prompt } from "./prompt";
import { UserInput } from "./user_input";

export function Term() {
    let [history, setHistory] = useState(new Array<HistoryItem>());
    let [submittedCommand, setSubmittedCommand] = useState<string | null>(
        "welcome",
    );

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
