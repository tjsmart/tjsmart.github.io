type CommandCallback = (args: string[]) => string;

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

export function registerCommand(command: Command) {
    commandMap.set(command.name, command);
}

export function getCommand(name: string): Command | null {
    return commandMap.get(name) || null;
}

export function handleCommand(commandLine: string): string {
    // TODO: better parsing...
    let [name, ...args] = commandLine.split(" ");

    const command = commandMap.get(name);
    if (!command) {
        return `command not found: ${name}`;
    }

    return command.callback(args);
}

const lb =
    "--------------------------------------------------------------------------------";

let help = new Command(
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
        let command = getCommand(args[0]);
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
