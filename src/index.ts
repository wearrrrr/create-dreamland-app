import chalk from "chalk"
import { generateSlug } from "random-word-slugs";
import Enquirer from "enquirer";
import * as fs from "node:fs";

console.clear();

console.log(chalk.bold.blue("Welcome to Dreamland!"));

function exit() {
    console.log(chalk.red("✖") + " Operation cancelled");
    process.exit(1);
}

type promptReturn = {
    template: string,
    projectDir: string,
    packageManager: string
}

function formatTemplate(value: string): string {
    if (value === "Sample files (recommended)") value = "Sample files";
    return "📁 " + value;
}

const questions = [
    {
        type: "input",
        name: "projectDir",
        message: "Where would you like to create your project?",
        initial: "./" + generateSlug(2),
        onCancel: () => { 
            exit();
            return false;
        },
    },
    {
        type: "select",
        name: "template",
        message: "Select a template to start with: ",
        choices: ["Sample files (recommended)", "Empty project", "Blog starter"],
        format: formatTemplate,
        onCancel: () => { 
            exit();
            return false;
        },
    },
    {
        "type": "select",
        "name": "packageManager",
        "message": "Which package manager would you like to use?",
        "choices": ["npm", "pnpm", "yarn"],
        onCancel: () => {
            exit();
            return false;
        }
    }
]

const enquirer = new Enquirer();
let promptAnswers = await enquirer.prompt(questions) as promptReturn;

console.log(chalk.green("✔") + " Creating project at " + chalk.bold(promptAnswers.projectDir) + " with template " + chalk.bold(promptAnswers.template) + " ...");

fs.mkdirSync(promptAnswers.projectDir, { recursive: true });

// Create package.json file
let packageJson = {
    "name": promptAnswers.projectDir.split("/").pop()?.toLowerCase(),
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "module",
    "scripts": {
        "start": "node index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "@mercuryworkshop/dreamlandjs": "^0.0.1",
    },
  }

fs.writeFileSync(promptAnswers.projectDir + "/package.json", JSON.stringify(packageJson, null, 2));

