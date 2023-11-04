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

    return (
        <div className="h-max m-3 flex flex-col-reverse">
            <label>
                <History history={history} />
                <div className="flex flex-row">
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
