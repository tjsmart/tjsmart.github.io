import { Command, registerCommand } from "./factory";

const about = new Command(
    "about",
    () => {
        return (
            <div className="w-[600px] text-justify">
                <p>
                    {`Hi there 👋! I'm Tyler, a software engineer with a passion
                    for creating innovative solutions. With over 8 years of
                    experience in Python 🐍, I possess a deep knowledge of its
                    standard library, typing system, popular third-party
                    packages, C ABI, and packaging system. My background is in
                    physics ⚛️, specifically a PhD with a focus on using
                    computational physics for predicting quantum mechanical
                    properties of materials, has equipped me with a unique
                    perspective in leveraging technology for quantum information
                    and quantum computation 🌠.`}
                </p>

                <br />

                <p>
                    In my current role as a technical lead at Solidigm/Intel, I
                    play a crucial role in developing cutting-edge validation
                    tools for solid-state drives 💾. My diverse skill set 💫
                    extends beyond Python, encompassing expertise in
                    technologies like C/C++, Rust, JavaScript, TypeScript, C#,
                    HTML/CSS, Docker, Unix, and Git.
                </p>

                <br />

                <p>
                    {`On this website, you'll find examples of my work, ranging
                    from elegant Python code to sophisticated quantum
                    simulations. Join me 🙌 on this journey as we explore the
                    fascinating world of software engineering, computational
                    physics, and more!`}
                </p>

                <br />

                <p>
                    {`Feel free to reach out to me at tjsmart@ucsc.edu to discuss
                    potential collaborations or exciting projects. Let's build a
                    brighter future together using technology and innovation! 🎉`}
                </p>
            </div>
        );
    },
    "Just a little bit about me.",
);

registerCommand(about);

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.about = about;
}
