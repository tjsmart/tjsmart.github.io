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

registerCommand(
    new Command(
        "what",
        () => Array.from(commandMap.keys()).join("\n"),
        "Lists what commands are available",
    ),
);
