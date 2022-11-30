import { Command } from 'commander';
import colors from 'colors';
import fs from 'fs';
import figlet from 'figlet';
import { execSync } from 'child_process';
import path from 'path';

// Specify git clone path
const gitClonePath = 'https://github.com/igor875126/new-engine-skeleton.git';

// Initialize commander
const program = new Command();
program.description(colors.yellow('New-Engine installer'));

// Register new command
program
    .command('new <name>')
    .description('New-Engine installer')
    .action((name) => {
        // Output
        console.log(colors.magenta(figlet.textSync('New-Engine')));
        console.log(colors.green('Crafting application...'));

        // Initialize new project path
        const projectPath = path.join(process.cwd(), name);

        // Do not proceed if project path is not empty
        if (fs.existsSync(projectPath)) {
            console.log(colors.red(`Application already exists! ${projectPath}`));
            process.exit(1);
        }

        // Clone project
        try {
            execSync(`git clone ${gitClonePath} ${name}`, {
                encoding: 'utf-8'
            });
            console.log(colors.green('Project cloned'));
        } catch (error) {
            console.log(colors.red('Error occurred during cloning new-engine, detailed information below'));
            console.log(colors.red(error));
        }

        // Remove .git folder
        fs.rmSync(path.join(projectPath, '.git'), { recursive: true });

        try {
            // Do npm install
            execSync(`cd ${projectPath} && npm install --quiet `, { stdio: [0, 1, 2] });
            console.log(colors.green('Npm packages installed'));
        } catch (error) {
            console.log(colors.red('Error occurred during npm install, detailed information below'));
            console.log(colors.red(error));
        }

        console.log('');
        console.log('');
        console.log('');
        console.log(colors.cyan('Your application is ready, have a nice day!'));
        console.log(colors.cyan('You now can run it now'));
        console.log(colors.cyan(`cd ${projectPath} ; npm run watch`));
        console.log('');
        console.log('');
        console.log('');
    });

// Parse cli arguments
program.parse(process.argv);
