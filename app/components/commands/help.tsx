import { Command, registerCommand, getCommand } from "./factory";

let help = new Command(
    "help",
    (args: string[]): string => {
        if (args.length == 0) {
            // TODO: error
            return "Provide a command to learn about.";
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
        return `Help on \`${command.name}\`\n--------------------------------------------------------------------------------\n${command.description}`;
    },
    "Display help on the provided command, e.g. `help what`",
);

registerCommand(help);
