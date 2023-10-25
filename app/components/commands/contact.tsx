import { Command, registerCommand } from "./factory";

type Contact = {
    kind: string;
    username: string;
    href: string;
    icon: string;
};

const contacts: Contact[] = [
    {
        kind: "email",
        username: "tjsmart@ucsc.edu",
        href: "mailto:tjsmart@ucsc.edu",
        icon: "envelope",
    },
    {
        kind: "github",
        username: "tjsmart",
        href: "https://www.github.com/tjsmart",
        icon: "github",
    },
    {
        kind: "linkedin",
        username: "Tyler Smart",
        href: "https://www.linkedin.com/in/tyler-smart-0a4a419b",
        icon: "linkedin-square",
    },
    {
        kind: "google scholar",
        username: "Tyler Smart",
        href: "https://www.scholar.google.com/citations?hl=en&user=r9supmkAAAAJ",
        icon: "graduation-cap",
    },
];

const contact = new Command(
    "contact",
    () => {
        return (
            <>
                {contacts.map((contact, index) => (
                    <div key={`${index}-${contact}`}>
                        <a
                            href={contact.href}
                            className="hover:text-red-500 underline"
                        >
                            <i className={`fa fa-${contact.icon}`}></i>
                            {` ${contact.kind} - ${contact.username}`}
                        </a>

                        <br />
                    </div>
                ))}
            </>
        );
    },
    `How to contact/follow me, e.g., ${contacts
        .slice(0, 2)
        .map((contact) => contact.kind)
        .join(", ")}.`,
);

registerCommand(contact);

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.contact = contact;
}
