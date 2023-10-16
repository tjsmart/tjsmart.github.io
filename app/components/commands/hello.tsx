import { Command, registerCommand } from "./factory";

const hello = new Command(
    "hello",
    // TODO: accept a parameter/argument for which language
    () => {
        let greeting = get_greeting();
        return `${greeting.greeting} (${greeting.language}, ${greeting.pronunciation})`;
    },
    // TODO: list languages here
    // TODO: these should really include options... perhaps argument parsing should be done by command...
    "I'll say hi back in a random language 😜",
);

registerCommand(hello);

type Greeting = {
    language: string;
    greeting: string;
    pronunciation: string;
};

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function get_greeting(): Greeting {
    let idx = getRandomInt(greetings.length);
    return greetings[idx];
}

const greetings: Greeting[] = [
    { language: "Spanish", greeting: "hola", pronunciation: "OH-la" },
    { language: "French", greeting: "bonjour", pronunciation: "bon-ZHOOR" },
    {
        language: "German",
        greeting: "guten Tag",
        pronunciation: "GOO-tehn tahk",
    },
    { language: "Italian", greeting: "salve", pronunciation: "SAL-vay" },
    {
        language: "Mandarin",
        greeting: "您好",
        pronunciation: "NEEN-haow",
    },
    {
        language: "Arabic",
        greeting: "السلام عليكم",
        pronunciation: "as-sah-lahm-u lay-kuhm",
    },
    {
        language: "Japanese",
        greeting: "こんにちは",
        pronunciation: "kohn-nee-chee-wah",
    },
    {
        language: "Korean",
        greeting: "안녕하세요",
        pronunciation: "AHN-young-ha-say-yo",
    },
    { language: "Portuguese", greeting: "olá", pronunciation: "oh-LA" },
    {
        language: "Hindi",
        greeting: "नमस्ते",
        pronunciation: "nuhm-uh-stay",
    },
    {
        language: "Russian",
        greeting: "здравствуйте",
        pronunciation: "za-DRAH-stvooy-tee",
    },
    { language: "Turkish", greeting: "merhaba", pronunciation: "mehr-hah-bah" },
    {
        language: "Vietnamese",
        greeting: "xin chào",
        pronunciation: "sin jow",
    },
    {
        language: "Farsi (Persian)",
        greeting: "سَلام",
        pronunciation: "sah-lahm",
    },
    {
        language: "Polish",
        greeting: "dzień dobry",
        pronunciation: "jayn doh-brih",
    },
];

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.hello = hello;
    module.exports.greetings = greetings;
}
