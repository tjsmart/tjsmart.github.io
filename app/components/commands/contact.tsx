import { Command, registerCommand } from "./factory";

const contact = new Command(
    "contact",
    () => {
        return contacts
            .map((contact) => `${contact.kind}.....${contact.value}`)
            .join("\n");
    },
    "How to contact/follow me, e.g, email, LinkedIn, ...",
);

registerCommand(contact);

type Contact = {
    kind: string;
    value: string;
};

const contacts: Contact[] = [
    { kind: "Email", value: "tjsmart@ucsc.edu" },
    { kind: "GitHub", value: "github.com/tjsmart" },
    { kind: "LinkedIn", value: "linkedin.com/in/tyler-smart-0a4a419b" },
    {
        kind: "Google Scholar",
        value: "scholar.google.com/citations?hl=en&user=r9supmkAAAAJ",
    },
];

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.contact = contact;
}
