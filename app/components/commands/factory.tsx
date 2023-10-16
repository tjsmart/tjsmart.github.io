type CommandCallback = (args: string[]) => string | JSX.Element;

export class Command {
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

/**
 * Register a command to the factory.
 *
 * @param command - the command to be registered
 */
export function registerCommand(command: Command) {
    // console.log(commandMap);
    if (commandMap.has(command.name)) {
        throw new Error(`Command ${command.name} is already registered!`);
    }
    commandMap.set(command.name, command);
}

/**
 * Handles the provided command line.
 *
 * @param commandLine - the input text to be handled
 * @returns The output from the command (if any)
 */
export function handleCommand(commandLine: string): JSX.Element {
    // TODO: better parsing...
    let [name, ...args] = commandLine.trim().split(" ");

    const command = commandMap.get(name);
    if (!command) {
        return <span> {`command not found: ${name}`} </span>;
    }

    const output = command.callback(args);
    if (typeof output === "string") {
        return (
            <>
                {output.split("\n").map((line: string) => (
                    <>
                        {line}
                        <br />
                    </>
                ))}
            </>
        );
    }
    return output;
}

const lb =
    "--------------------------------------------------------------------------------";

const help = new Command(
    "help",
    (args: string[]): string => {
        if (args.length == 0) {
            let outputLines = new Array("Available Commands:", lb);
            let commandDetails = Array.from(commandMap.values()).map(
                (value: Command) => `${value.name} - ${value.description}`,
            );

            outputLines.push(...commandDetails);
            return outputLines.join("\n");
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
        return `Help on \`${command.name}\`\n${lb}\n${command.description}`;
    },
    "Display help on the provided command, e.g. `help hello`",
);

registerCommand(help);

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.help = help;
    module.exports.commandMap = commandMap;
}
