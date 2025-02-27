const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const directoriesToClean = [
    'src/2-pages',
    'src/3-widgets',
    'src/4-features',
    'src/5-entities',
    'src/6-shared/config',
    'src/6-shared/ui/layouts',
];

const filesToClear = [
    'src/1-app/app.component.html',
    'src/1-app/app.component.scss',
    'src/1-app/app.component.ts',
    'src/1-app/app.routes.ts',
];

const appComponentTsContent = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fsd-angular-template';
}
`;

const appRoutesTsContent = `import { Routes } from '@angular/router';

export const routes: Routes = [];
`;

function clearFolderContents(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const filePath = path.join(folderPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                fs.rmSync(filePath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(filePath);
            }
        });
        console.log(`✅ Cleared contents: ${folderPath}`);
    }
}

function clearFile(filePath, content = '') {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Cleared: ${filePath}`);
}

function askUser(question, callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question(question, (answer) => {
        rl.close();
        callback(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
}

askUser('Are you sure you want to delete the demo project? (yes/no): ', (confirmed) => {
    if (!confirmed) {
        console.log('❌ Operation cancelled.');
        return;
    }

    console.log('\n🔹 Cleaning demo project...\n');

    directoriesToClean.forEach(clearFolderContents);

    filesToClear.forEach((file) => clearFile(file));

    clearFile('src/1-app/app.component.ts', appComponentTsContent);
    clearFile('src/1-app/app.routes.ts', appRoutesTsContent);

    console.log('\n✅ Demo project cleanup complete! Running code formatting...\n');

    try {
        execSync('npm run format', { stdio: 'inherit' });
        console.log('✅ Code formatted successfully.');
    } catch (error) {
        console.error('⚠️ Error running npm run format:', error.message);
    }
});
