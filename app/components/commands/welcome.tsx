import { Command, registerCommand } from "./factory";

const welcome = new Command(
    "welcome",
    () => {
        return (
            <>
                <h1 className="bg-orange-800 text-center">
                    {`Welcome to Tyler Smart's personal website! 🎉`}
                </h1>
                <p>This website is inspired by modern terminal applications.</p>
                <p>
                    To get started, try running the `help` command to see what
                    commands are available.
                </p>
            </>
        );
    },
    "Welcome message displayed at on startup.",
);

registerCommand(welcome);

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.welcome = welcome;
}
