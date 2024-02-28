import chalk from "chalk"
import { generateSlug } from "random-word-slugs";
import Enquirer from "enquirer";

console.clear();

console.log(chalk.bold.blue("Welcome to Dreamland!"));

function exit() {
    console.log(chalk.red("✖") + " Operation cancelled");
    process.exit(1);
}

let projectDirectory = await Enquirer.prompt([
    {
        type: "input",
        name: "projectName",
        message: "Where would you like to create your project?",
        initial: "./" + generateSlug(2),
        onCancel: () => { 
            exit();
            return false;
        },
    },
]);

function formatTemplate(value: string): string {
    if (value === "Sample files (recommended)") value = "Sample files";
    return "📁 " + value;
}

let selectedTemplate = await Enquirer.prompt([
    {
        type: "select",
        name: "selectedTemplate",
        message: "Select a template to start with: ",
        choices: ["Sample files (recommended)", "Empty project", "Blog starter"],
        format: formatTemplate,
        onCancel: () => { 
            exit();
            return false;
        },
    },
]);