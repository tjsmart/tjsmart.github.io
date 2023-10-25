import { Command, registerCommand } from "./factory";

const welcome = new Command(
    "welcome",
    () => {
        return (
            <>
                <h1 className="bg-red-950 text-center">
                    Welcome to Tyler Smart's personal website! 🎉
                </h1>
                <p>
                    I've created this website inspired by modern terminal
                    applications.
                </p>
                <p>
                    To get started, try running the `help` command to see what
                    commands are available.
                </p>
            </>
        );
    },
    "Welcome message displayed at on startup",
);

registerCommand(welcome);

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.welcome = welcome;
}
