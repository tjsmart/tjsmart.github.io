import { Prompt } from "./prompt";

export type HistoryItem = {
    command: string;
    output: string;
};

type HistoryProps = {
    history: HistoryItem[];
};

export function History({ history }: HistoryProps) {
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
