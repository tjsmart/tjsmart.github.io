import { Prompt } from "./prompt";

export type HistoryItem = {
    command: string;
    output: JSX.Element;
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
                    {item.output && item.output}
                </div>
            ))}
        </div>
    );
}
