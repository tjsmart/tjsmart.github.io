import { useEffect, useState } from "react";
import { Command, registerCommand } from "./factory";

type SimpleDate = [year: number, month: number];

type Project = {
    title: string;
    tags: string[];
    href: string;
    brief: string;
    summary: JSX.Element;
    started: SimpleDate;
    ended: SimpleDate | null;
};

let projects: Map<string, Project> = new Map();

export function registerProject(project: Project) {
    if (projects.has(project.title)) {
        throw new Error(
            `Project with title ${project.title} has already been registered!`,
        );
    }
    projects.set(project.title, project);
}

const project = new Command(
    "project",
    (args) => {
        if (args.length == 0) {
            return (
                <div className="grid grid-cols-3">
                    {Array.from(projects.values()).map((project, index) => (
                        <div
                            className="border-teal-300 border-solid border-2 rounded p-2 m-3 hover:border-red-300"
                            key={index}
                        >
                            <div className="flex flex-row place-content-between space-x-10">
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="text-2xl text-sky-100 hover:text-red-300">
                                        {project.title}
                                    </span>
                                </a>
                                <div className="space-x-2 overflow-hidden">
                                    {project.tags.length == 0 ||
                                        project.tags.map((tag, index) => (
                                            <span
                                                className="bg-sky-950 rounded-lg border-2 p-1 border-none text-blue-300"
                                                key={index}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                            </div>
                            <hr />
                            <p className="text-right text-gray-500">
                                {formatProjectDates(project)}
                            </p>

                            {project.brief}
                        </div>
                    ))}
                </div>
            );

            // } else if (args.length == 1) {
            //     const [arg] = args;
            //     let selectedContact = contacts.find(({ kind }) => kind == arg);
            //     if (selectedContact) {
            //         window.open(selectedContact.href, "_blank");
            //         return "";
            //     }
            //     return `error: unknown contact '${arg}'`;
        } else {
            return "error: project does not handle any argument";
        }
    },
    "Learn more about the projects I am currently working or recently completed!",
);

registerCommand(project);

function formatProjectDates(project: Project): string {
    const started = formatDate(project.started);
    if (
        project.ended &&
        project.ended[0] === project.started[0] &&
        project.ended[1] === project.started[1]
    ) {
        return started;
    }
    const ended = project.ended ? formatDate(project.ended) : "present";
    return `${started} - ${ended}`;
}

function formatDate(date: SimpleDate): string {
    const [year, month] = date;
    return `${year}/${String(month).padStart(2, "0")}`;
}

if (process.env["NODE_DEV"] == "TEST") {
    module.exports.project = project;
    module.exports.projects = projects;
}
